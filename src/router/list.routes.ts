import express from "express";
import authenticate from "../middlewares/auth.middleware";
import { addToMyList, listMyItems, removeFromMyList } from "../controllers/list.controller";

const listRouter = express.Router();

listRouter.post("/add", authenticate, addToMyList);
listRouter.delete("/:id/remove", authenticate, removeFromMyList);
listRouter.get("/", authenticate, listMyItems);

export default listRouter