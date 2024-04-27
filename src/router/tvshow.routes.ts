import express from "express";
import { addtvshow, gettvshow, gettvshowById, removetvshow, updatetvshow } from "../controllers/tvshow.controller";

const tvshowRouter = express.Router();

tvshowRouter.get("/all", gettvshow);
tvshowRouter.get("/:id", gettvshowById);
tvshowRouter.post("/add", addtvshow);
tvshowRouter.patch("/:id/update", updatetvshow);
tvshowRouter.delete("/:id", removetvshow);

export default tvshowRouter;