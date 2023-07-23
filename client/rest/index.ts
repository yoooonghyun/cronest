import axios, { Axios } from 'axios';
import bodyParser from 'body-parser'
import { config } from "dotenv";
import express, { Express, Request, Response } from "express";

const run = async (): Promise<void> => {
  config();

  const serverUrl = process.env.SERVER_URL;
  const clientUrl = process.env.CLIENT_URL;
  const clientPort = process.env.CLIENT_PORT;

  if (!serverUrl || !clientUrl || !clientPort) throw new Error("Please check environments!");

  const callbackUri = "/schedule/callback";

  const expressInst: Express = express();
  const axiosInst: Axios = axios.create({ baseURL: serverUrl });

  expressInst.use(bodyParser.urlencoded({ extended: false }));
  expressInst.use(bodyParser.json());

  expressInst.post(callbackUri, (req: Request, res: Response) => {
    console.log(`Schedule callback w/: ${JSON.stringify(req.body, null, 4)}`);

    res.send(null);
  });

  expressInst.listen(clientPort, () => {
    console.log(`[REST Client]: App is running on port: ${clientPort}`);
  });

  axiosInst.post("/scheduleJob", {
    callbackCannel: "REST",
    callbackPath: `${clientUrl}${callbackUri}`,
    cronSchedule: "* * * * * *",
    domain: "REST_TEST",
    key: "CALLBACK_TEST",
    runningState: "ON"
  })

  return;
}

run();