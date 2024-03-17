import { Consumer } from "sqs-consumer";
import { SQSClient } from "@aws-sdk/client-sqs";
import log4js from "log4js";
const log = log4js.getLogger("utils:sqsReceiver");
log.level = "info";

// Define SQS Region
const client = new SQSClient({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

const queueUrls: string[] = [`${process.env.SQS_BASE_URL}email-welcome.fifo`];

// * seperate business logic for each queue
const processQueue1Message = async (messageBody: any) => {
  log.info("Service 2- Processing message from queue 1:", messageBody);
};

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
