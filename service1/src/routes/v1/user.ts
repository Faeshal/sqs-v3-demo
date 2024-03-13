import express from "express";
import * as userController from "../../controllers/user";
const router = express.Router();

router.get("/users", userController.getUsers);
router.post("/users", userController.pushUser);

export default router;
