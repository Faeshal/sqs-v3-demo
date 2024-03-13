import log4js from "log4js";
import Chance from "chance";
import sqsPublisher from "../utils/sqsPublisher";
const chance = new Chance();
const log = log4js.getLogger("service:user");
log.level = "debug";

export const pushUser = async () => {
  // * gen date

  var data = {
    name: chance.name(),
    phone: chance.phone(),
    address: chance.address(),
  };

  // * push to sqs

  // ! v2
  // var params = {
  //   DelaySeconds: 2,
  //   MessageAttributes: {
  //     Author: {
  //       DataType: "String",
  //       StringValue: "Karandeep Singh",
  //     },
  //   },
  //   MessageBody: "TEST of the SQS service.",
  //   QueueUrl: "https://sqs.us-east-1.amazonaws.com/570411717331/MyTestQueue",
  // };

  // let queueRes = await sqs.sendMessage(params).promise();
  // const response = {
  //   statusCode: 200,
  //   body: queueRes,
  // };
  // return response;

  // ! V3w
  // const input = {
  //   QueueUrl:
  //     "https://sqs.ap-southeast-1.amazonaws.com/851240457083/dummy-microservice",
  //   MessageBody: JSON.stringify(data),
  // };
  // const command = new SendMessageCommand(input);
  // const response = await client.send(command);
  // log.info("SQS:", response);

  data.type = "user";
  const sqs = await sqsPublisher("push-user.fifo", JSON.stringify(data));
  let finalData = { data, sqs };
  return finalData;
};

export const getUsers = async (body: any) => {
  log.info("body", body);
  return "data";
};
