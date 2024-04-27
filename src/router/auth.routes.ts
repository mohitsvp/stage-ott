import express from "express";
import { registerUser, verifyUser } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", verifyUser);

export default authRouter