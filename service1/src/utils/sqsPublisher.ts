import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import uniqid from "uniqid";
import log4js from "log4js";
const log = log4js.getLogger("utils:sqsPublisher");
log.level = "info";

// sqs init
const client = new SQSClient({ region: "ap-southeast-1" });

async function sqsPublisher(queue: string, data: string) {
  try {
    let sqsUrl: string = process.env.SQS_BASE_URL + queue;
    var input: any = { QueueUrl: sqsUrl, MessageBody: data };

    if (queue.includes(".fifo")) {
      log.info("📔 SQS FIFO");
      input.MessageGroupId = queue;
      input.MessageDeduplicationId = uniqid();
    } else {
      log.info("📗 SQS STANDARD");
    }

    log.warn("input", input);

    const command = new SendMessageCommand(input);
    const response = await client.send(command);

    log.info("🥗 success push to queue:", response);

    return response;
  } catch (err: any) {
    log.error(err);
    return;
  }
}

export default sqsPublisher;
