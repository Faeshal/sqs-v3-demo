import { Consumer } from "sqs-consumer";
import { SQSClient } from "@aws-sdk/client-sqs";
const client = new SQSClient({ region: "ap-southeast-1" });

import log4js from "log4js";
const log = log4js.getLogger("utils:sqsReceiver");
log.level = "info";

async function sqsConsumer() {
  try {
    const sqsApp = Consumer.create({
      queueUrl:
        "https://sqs.ap-southeast-1.amazonaws.com/851240457083/push-user.fifo",
      sqs: client,
      handleMessage: async (message) => {
        // do some work with `message`
        log.info("⭐ NEW MSG:", message);
        log.warn("=-=-=-=-=-=-=-=-=-=-=-=-=");
      },
      batchSize: 3, // Process one message at a time
      shouldDeleteMessages: false,
    });

    sqsApp.on("error", (err) => {
      log.error(err.message);
    });

    sqsApp.on("processing_error", (err) => {
      log.error(err.message);
    });

    sqsApp.start();
  } catch (err: any) {
    log.error(err);
    return;
  }
}

export { sqsConsumer };
