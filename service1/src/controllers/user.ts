import asyncHandler from "express-async-handler";
import * as userService from "../services/user";
import { ErrorResponse } from "../middleware/errorHandler";
import _ from "underscore";
import log4js from "log4js";
const log = log4js.getLogger("controllers:user");
log.level = "info";

// * @route POST /api/v1/users
// @desc    generate users
// @access  private
export const pushUser = asyncHandler(async (req, res, next) => {
  const data = await userService.pushUser();
  res.status(200).json({
    success: true,
    data: data.data,
    sqs: data.sqs,
  });
});

// * @route GET /api/v1/users
// @desc    get users
// @access  private
export const getUsers = asyncHandler(async (req, res, next) => {
  // const { role, search } = req.query;
  res.status(200).json({
    success: true,
    data: "",
  });
});
