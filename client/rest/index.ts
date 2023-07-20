import axios, { Axios } from 'axios';
import bodyParser from 'body-parser'
import { config } from "dotenv";
import express, { Express, Request, Response } from "express";

const run = async (): Promise<void> => {
  config();

  const port: number = 3002;
  const serverUrl = "http://localhost:3001";

  console.log(serverUrl)
  const expressInst: Express = express();
  const axiosInst: Axios = axios.create({ baseURL: serverUrl });

  expressInst.use(bodyParser.urlencoded({ extended: false }));
  expressInst.use(bodyParser.json());

  expressInst.post('/schedule/callback', (req: Request, res: Response) => {
    console.log(`Schedule callback w/: ${JSON.stringify(req.body, null, 4)}`)

    res.send(null);
  });

  expressInst.listen(port, () => {
    console.log(`[server]: Server is running at <https://localhost>:${port}`);
  });

  axiosInst.post("/scheduleJob", {
    callbackCannel: "REST",
    callbackPath: "http://localhost:3002/schedule/callback",
    cronSchedule: "* * * * * *",
    domain: "TEST",
    key: "CALLBACK_TEST",
    runningState: "ON"
  })

  return;
}

run();