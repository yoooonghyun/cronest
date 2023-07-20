import { Connection, ConsumeMessage, connect } from "amqplib"
import { config } from "dotenv";

const run = async () => {
  config();

  const _errorHandler = (err) => {
    channel = null;
    if (RECONNECT) {
      setTimeout(() => {
        // this._connect();
      }, RECONNECT_INTERVAL);
    } else {
      // this.failureCb();
      // this.close().catch((e: Error) => {
      // });
    }
  }

  const RECONNECT = true;
  const RECONNECT_INTERVAL = 1000;
  const connection: Connection = await connect('amqp://user:password@localhost:5672');


  connection.on('error', _errorHandler);
  connection.on('close', _errorHandler);
  let channel = await connection.createChannel()

  channel.assertQueue("CRONEST_REQUEST_QUEUE", {
    durable: false
  });

  channel.assertQueue("CRONEST_CALLBACK_QUEUE", {
    durable: false
  });


  channel.consume("CRONEST_CALLBACK_QUEUE", (msg: ConsumeMessage) => {
    console.log(msg);
  });

  channel.sendToQueue("CRONEST_REQUEST_QUEUE", Buffer.from(JSON.stringify({
    pattern: 'createScheduleJob',
    data: {
      callbackCannel: "RABBIT_MQ",
      callbackPath: "testScheduleCallback",
      cronSchedule: "* * * * * *",
      domain: "RABBIT_TEST",
      key: "CALLBACK_TEST",
      runningState: "ON"
    },
  })));
}

run();