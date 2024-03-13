import { Consumer } from "sqs-consumer";
import { SQSClient } from "@aws-sdk/client-sqs";
import log4js from "log4js";
const log = log4js.getLogger("utils:sqsReceiver");
log.level = "info";

// Define SQS Region
const client = new SQSClient({ region: "ap-southeast-1" });

// // Define Queue URLs
// const queueUrls: { [key: string]: string } = {
//   queue1: `${process.env.SQS_BASE_URL}push-user.fifo`,
//   queue2: `${process.env.SQS_BASE_URL}email-welcome.fifo`,
// };

const queueUrls: string[] = [
  `${process.env.SQS_BASE_URL}push-user.fifo`, // 0
  `${process.env.SQS_BASE_URL}email-welcome.fifo`, // 1
];

// * business logic for each queue
const processQueue1Message = async (messageBody: any) => {
  log.info("1️⃣ Processing message from queue 1:", messageBody);
};

const processQueue2Message = async (messageBody: any) => {
  log.info("2️⃣ Processing message from queue 2:", messageBody);
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

// Function to process messages with different logic based on the queue

// * global dynamic queue handler
const handleMessage = async (message: any, queueUrl: string) => {
  try {
    log.warn("queueUrl", queueUrl);
    const body = JSON.parse(message.Body);
    log.warn("⭕ NEW MESSAGE", body);

    // Determine the queue based on its position in the array
    const queueIndex = queueUrls.indexOf(queueUrl); // return an index 0,1,2 dst..
    if (queueIndex !== -1) {
      if (queueIndex === 0) {
        await processQueue1Message(body);
      } else if (queueIndex === 1) {
        await processQueue2Message(body);
      }
    } else {
      log.error("no queue url suply!");
    }

    log.info("finish scanning queue...");
  } catch (error) {
    log.error("Error handling message:", error);
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
