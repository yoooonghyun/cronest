import { Connection, ConsumeMessage, connect } from 'amqplib'
import { config } from 'dotenv';

type AmqpPayload = {
  readonly pattern: string;
  readonly data: object;
}

const run = async () => {
  config();

  const requestQueue = 'CRONEST_REQUEST_QUEUE';
  const callbackQueue = 'CRONEST_CALLBACK_QUEUE';
  const callbackPath = 'testScheduleCallback';
  const rabbitMqUrl = process.env.RABBIT_MQ_URL;

  if (!rabbitMqUrl) throw new Error("Please check environments!");

  const connection: Connection = await connect(rabbitMqUrl);

  connection.on('error', (err) => {
    console.error(err);
  });
  connection.on('close', () => {
    console.error('Connection is closed');
  });
  let channel = await connection.createChannel();

  channel.assertQueue(requestQueue, {
    durable: false
  });

  channel.assertQueue(callbackQueue, {
    durable: false
  });

  channel.consume(callbackQueue, (msg: ConsumeMessage) => {
    const payload: AmqpPayload = JSON.parse(msg.content.toString())

    if (payload.pattern === callbackPath) {
      console.log(payload.data)
    }

    channel.ack(msg);
  });

  channel.sendToQueue(requestQueue, Buffer.from(JSON.stringify({
    pattern: 'createScheduleJob',
    data: {
      callbackCannel: 'RABBIT_MQ',
      callbackPath: callbackPath,
      cronSchedule: '* * * * * *',
      domain: 'RABBIT_TEST',
      key: 'CALLBACK_TEST',
      runningState: 'ON'
    },
  })));
}

run();