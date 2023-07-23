import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { AppModule } from 'src/app.module';
import { RabbitMqQueueEnum } from 'src/third.party/rabbit.mq/rabbit.mq.enum';
import { ConfigService } from '@nestjs/config';
import * as R from 'ramda';

const port = process.env.PORT || 3001;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const rabbitMqUrl = configService.get('RABBIT_MQ_URL');

  if (R.isNotNil(rabbitMqUrl)) {
    app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: [rabbitMqUrl],
        queue: RabbitMqQueueEnum.REQUEST,
        queueOptions: { durable: false },
      },
    });
  }

  const grpcUrl = configService.get('GRPC_ADDRESS');

  if (grpcUrl) {
    const rootDir = configService.get('ROOT_DIR');

    const protoPath = join(rootDir, 'proto/schedule.job.proto');

    app.connectMicroservice({
      transport: Transport.GRPC,
      options: {
        url: grpcUrl,
        package: 'schedule_job',
        protoPath,
      },
    });
  }

  app.useGlobalPipes(new ValidationPipe());

  const microservices = app.getMicroservices();

  microservices.forEach((s) => s.useGlobalPipes(new ValidationPipe()));

  app.startAllMicroservices();
  await app.listen(port);
}
bootstrap();
