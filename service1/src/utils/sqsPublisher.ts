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
    const id = uniqid();

    const input = {
      QueueUrl: sqsUrl,
      MessageBody: data,
      MessageGroupId: "user", // only for fifo sqs
      MessageDeduplicationId: id, //only for fifo sqs,
      Attributes: {
        DelaySeconds: "0",
        MessageRetentionPeriod: "86400",
      },
    };
    const command = new SendMessageCommand(input);
    const response = await client.send(command);

    return response;
  } catch (err: any) {
    log.error(err);
    return;
  }
}

export default sqsPublisher;
