import express from "express";
import { addGenre, getGenre, getGenreById, removeGenre, updateGenre } from "../controllers/genre.controller";

const genreRouter = express.Router();

genreRouter.get("/all", getGenre);
genreRouter.get("/:id", getGenreById);
genreRouter.post("/add", addGenre);
genreRouter.patch("/:id", updateGenre);
genreRouter.delete("/:id", removeGenre);

export default genreRouter;