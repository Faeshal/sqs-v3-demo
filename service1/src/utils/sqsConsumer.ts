import { Consumer } from "sqs-consumer";
import { SQSClient } from "@aws-sdk/client-sqs";
import log4js from "log4js";
const log = log4js.getLogger("utils:sqsReceiver");
log.level = "info";

// * init sqs
const client = new SQSClient({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

// * define queue
const queueUrls: string[] = [
  `${process.env.SQS_BASE_URL}push-user.fifo`, // 0
  `${process.env.SQS_BASE_URL}gen-ip`, // 1,....
];

// * seperate business logic for each queue
const processQueue1Message = async (messageBody: any) => {
  log.info("1️⃣ Processing message from queue 1:", messageBody);
};

const processQueue2Message = async (messageBody: any) => {
  log.info("2️⃣ Processing message from queue 2:", messageBody);
};

const processQueue3Message = async (messageBody: any) => {
  log.info("3️⃣ Processing message from queue 3:", messageBody);
};

// async function sqsConsumer() {
//   try {
//     const sqsApp = Consumer.create({
//       queueUrl:
//         "https://sqs.ap-southeast-1.amazonaws.com/851240457083/push-user.fifo",
//       sqs: client,
//       handleMessage: async (message) => {
//         // do some work with `message`
//         log.info("⭐ NEW MSG:", message);
//         log.warn("=-=-=-=-=-=-=-=-=-=-=-=-=");
//       },
//       batchSize: 3, // Process one message at a time
//       shouldDeleteMessages: false,
//     });

//     sqsApp.on("error", (err) => {
//       log.error(err.message);
//     });

//     sqsApp.on("processing_error", (err) => {
//       log.error(err.message);
//     });

//     sqsApp.start();
//   } catch (err: any) {
//     log.error(err);
//     return;
//   }
// }

// * global dynamic queue handler
const handleMessage = async (message: any, queueUrl: string) => {
  try {
    const body = JSON.parse(message.Body);
    log.warn("⭕ NEW MESSAGE", body);

    // queue mapping based index
    const index = queueUrls.indexOf(queueUrl); // return an index 0,1,2 dst..
    if (index !== -1) {
      if (index === 0) {
        await processQueue1Message(body);
      } else if (index === 1) {
        await processQueue2Message(body);
      } else if (index === 2) {
        await processQueue3Message(body);
      }
    } else {
      log.error("no queue url suply!");
    }

    log.info("finish scanning queue...");
  } catch (error) {
    log.error("Error handling message:", error);
    return;
  }
};

// * main listener
async function sqsConsumer() {
  try {
    for (const queueUrl of queueUrls) {
      const app = Consumer.create({
        queueUrl: queueUrl,
        sqs: client,
        handleMessage: (message) => handleMessage(message, queueUrl),
        visibilityTimeout: 20,
        waitTimeSeconds: 0,
      });

      app.on("error", (err) => {
        log.error(err.message);
      });

      app.on("processing_error", (err) => {
        log.error(err.message);
      });

      app.start();
    }
  } catch (err: any) {
    log.error(err);
    return;
  }
}

export default sqsConsumer;
