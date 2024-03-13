import {
  SQSClient,
  ListQueuesCommand,
  ReceiveMessageCommand,
  SendMessageCommand,
} from "@aws-sdk/client-sqs";
const client = new SQSClient({ region: "ap-southeast-1" });
import log4js from "log4js";
const log = log4js.getLogger("service:user");
log.level = "debug";

export const getUsers = async () => {
  const input = {
    QueueUrl:
      "https://sqs.ap-southeast-1.amazonaws.com/851240457083/dummy-microservice", // required
  };
  const command = new ReceiveMessageCommand(input);
  const response = await client.send(command);
  // { // ReceiveMessageResult
  log.warn("response", response);
  return response;
};
