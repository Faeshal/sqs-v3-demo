import { Consumer } from "sqs-consumer";
import { SQSClient } from "@aws-sdk/client-sqs";
const client = new SQSClient({ region: "ap-southeast-1" });
import log4js from "log4js";
const log = log4js.getLogger("utils:sqsConsumer");
log.level = "info";

async function sqsConsumer() {
  try {
    const sqs = Consumer.create({
      queueUrl: `${process.env.SQS_BASE_URL}push-user.fifo`,
      sqs: client,
      handleMessage: async (message) => {
        // do some work with `message`

        log.info("⭐ NEW MSG:", message);
        log.info("㊗️ TYPE:", message.MessageAttributes);
        log.warn("=-=-=-=-=-=-=-=-=-=-=-=-=");
      },
      batchSize: 1, // Process one message at a time
    });

    sqs.on("error", (err) => {
      log.error(err.message);
    });

    sqs.on("processing_error", (err) => {
      log.error(err.message);
    });

    sqs.start();
  } catch (err: any) {
    log.error(err);
    return;
  }
}

export { sqsConsumer };
