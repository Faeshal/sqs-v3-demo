import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import log4js from "log4js";
const log = log4js.getLogger("utils:sqsPublisher");
log.level = "info";

// sqs init
const client = new SQSClient({ region: "ap-southeast-1" });

async function sqsPublisher(url: string, data: string) {
  try {
    let sqsUrl: string = process.env.SQS_BASE_URL + url;
    const randomId = (Math.random() + 1).toString(36).substring(7);

    const input = {
      QueueUrl: sqsUrl,
      MessageBody: data,
      MessageGroupId: "newUser", // only use for fifo sqs
      MessageDeduplicationId: randomId, // only use for fifo sqs
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
