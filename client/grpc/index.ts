import { join } from 'path';
import { config } from "dotenv";
import { ChannelCredentials, Server, ServerCredentials, ServerUnaryCall, loadPackageDefinition, sendUnaryData } from '@grpc/grpc-js';
import { Options, loadSync } from "@grpc/proto-loader";

const loadServer = (
  rootDir: string,
  clientAddress: string,
  options?: Options): void => {
  const jobCallbackPath = join(rootDir, '../../proto/job.callback.proto');

  const server = new Server()

  const packageDefinition = loadSync(jobCallbackPath, options);

  const jobCallbackProto = loadPackageDefinition(packageDefinition);

  const jobCallbackService = jobCallbackProto.job_callback['JobCallbackService']['service'];

  server.addService(jobCallbackService, {
    sendCallback: (call: ServerUnaryCall<any, any>, callback: sendUnaryData<ResponseType>) => {
      console.log(call.request)
      callback(null, null);
    },
  });

  server.bindAsync(
    clientAddress,
    ServerCredentials.createInsecure(),
    (error: Error, port: number) => {
      console.log(`Server running at port:${port}`);
      server.start();
    }
  );
}


const loadClient = (
  rootDir: string,
  serverAddress: string,
  clientAddress: string,
  options?: Options) => {
  const scheduleJobPath = join(rootDir, '../../proto/schedule.job.proto');

  const packageDefinition = loadSync(scheduleJobPath, options);

  const scheduleJobProto = loadPackageDefinition(packageDefinition);

  const ScheduleJobService = scheduleJobProto.schedule_job['ScheduleJobService'];

  const client = new ScheduleJobService(serverAddress, ChannelCredentials.createInsecure());

  const payload = {
    callbackCannel: "GRPC",
    callbackPath: clientAddress,
    cronSchedule: "* * * * * *",
    domain: "GRPC_TEST",
    key: "CALLBACK_TEST",
    runningState: "ON"
  };

  client.create(payload, function (_, response) {
    console.log('Data:', response); // API response
  });
}

const run = async (): Promise<void> => {
  config();

  const rootDir = process.env.ROOT_DIR || __dirname;
  const serverAddress = process.env.SERVER_ADDRESS;
  const clientAddress = process.env.CLIENT_ADDRESS;

  if (!serverAddress || !clientAddress) throw new Error("Please check environments!");


  const options: Options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  };

  loadServer(rootDir, clientAddress, options)

  loadClient(rootDir, serverAddress, clientAddress, options);

  return;
}

run();