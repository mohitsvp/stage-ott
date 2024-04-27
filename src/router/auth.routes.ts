import express from "express";
import { registerUser, verifyUser } from "../controllers/auth.controller";
import authenticate from "../middlewares/auth.middleware";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", verifyUser);

export default authRouter