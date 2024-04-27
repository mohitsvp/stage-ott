import express from "express";
import { addMovie, getMovieById, getMovies, removeMovie, updateMovie } from "../controllers/movie.controller";

const movieRouter = express.Router();

movieRouter.get("/all", getMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.post("/add", addMovie);
movieRouter.patch("/:id/update", updateMovie);
movieRouter.delete("/:id", removeMovie);

export default movieRouter;