import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { Transport } from '@nestjs/microservices';
import { RabbitMqQueueEnum } from './third.party/rabbit.mq/rabbit.mq.enum';

const port = process.env.PORT || 3001;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://user:password@localhost:5672`],
      queue: RabbitMqQueueEnum.REQUEST,
      queueOptions: { durable: false },
    },
  });

  // app.connectMicroservice({
  //   transport: Transport.GRPC,
  //   options: {
  //     package: 'cronest',
  //     protoPath: join(__dirname, 'third.party/grpc/cronest.proto'),
  //   },
  // });

  app.useGlobalPipes(new ValidationPipe());

  const microservices = app.getMicroservices();

  microservices.forEach((s) => s.useGlobalPipes(new ValidationPipe()));

  app.startAllMicroservices();
  await app.listen(port);
}
bootstrap();
