import asyncHandler from "express-async-handler";
import * as userService from "../services/user";
import { ErrorResponse } from "../middleware/errorHandler";
import _ from "underscore";
import log4js from "log4js";
const log = log4js.getLogger("controllers:user");
log.level = "info";

// * @route GET /api/v1/users
// @desc    get users
// @access  private
export const getUsers = asyncHandler(async (req, res, next) => {
  const data = await userService.getUsers();
  res.status(200).json({
    success: true,
    data,
  });
});
