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

  var welcome = {
    id: chance.timestamp(),
    email: chance.sentence(),
  };

  // * push to queue A
  const sqsA = await sqsPublisher("push-user.fifo", JSON.stringify(data));

  // * push to queue B
  const sqsB = await sqsPublisher(
    "email-welcome.fifo",
    JSON.stringify(welcome)
  );

  let finalData = { data, sqsA, sqsB };
  return finalData;
};

export const getUsers = async (body: any) => {
  log.info("body", body);
  return "data";
};
