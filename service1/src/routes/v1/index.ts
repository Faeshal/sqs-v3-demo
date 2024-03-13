import express from "express";
const router = express.Router();
import userRoute from "./user";

router.use("/", userRoute);

export default router;
