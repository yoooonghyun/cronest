import { join } from 'path';
import * as R from 'ramda';
import { Injectable, Logger } from '@nestjs/common';
import { ClientGrpcProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ScheduleJob } from 'src/model/schedule.job';
import { PublisherDelegate } from 'src/publisher/publisher.delegate';
import { ReadScheduleJobMessage } from 'src/data/protobuf/schdule.job.message';
import { ServiceError } from '@grpc/grpc-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GrpcPublisherDelegate implements PublisherDelegate {
  private readonly logger: Logger;

  public readonly clients: { [key: string]: ClientGrpcProxy };

  public readonly services: { [key: string]: any };

  constructor(private readonly configSvc: ConfigService) {
    this.logger = new Logger(GrpcPublisherDelegate.name);
    this.clients = {};
  }

  public async sendCallback(job: ScheduleJob): Promise<void> {
    this.logger.log(`Publish callback: ${job.domain}, key: ${job.key}.`);

    const client = this.getClient(job.callbackPath);

    const service: any = client.getClientByServiceName('JobCallbackService');

    service.sendCallback(
      ReadScheduleJobMessage.createFromOutput(job),
      (err: ServiceError | null, value?: ResponseType) => {},
    );
  }

  public getClient(path: string): ClientGrpcProxy {
    const client = this.clients[path];

    if (R.isNotNil(client)) return client;

    const rootDir = this.configSvc.get('ROOT_DIR');

    const newClient = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        url: path,
        package: 'job_callback',
        protoPath: join(rootDir, 'proto/job.callback.proto'),
      },
    });

    this.clients[path] = newClient;

    return newClient;
  }

  public async sendScheduleSafety(job: ScheduleJob): Promise<void> {
    try {
      await this.sendCallback(job);
    } catch (err: any) {
      this.logger.error(err);
    }
  }
}
