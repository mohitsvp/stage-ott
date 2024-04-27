import { Request, Response } from 'express';
import MovieModel from '../models/movie.model';

const addMovie = async (req: Request, res: Response) => {
    try {
        let movie = new MovieModel(req.body);
        movie = await movie.save();
        return res.status(201).send({ message: 'Movie added successfully', _id :  movie._id});
    } catch (error) {
        console.log("Error in adding movie ", error);
        return res.status(500).send({ message: 'Error while adding the movie' });
    }
}

const updateMovie = async (req: Request, res: Response) => {
    try {
        const movie = await MovieModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).send(movie);
    } catch (error) {
        console.log("Error in updating movie ", error);
        return res.status(500).send({ message: 'Error while updating the movie' });
    }
}

const removeMovie = async (req: Request, res: Response) => {
    try {
        await MovieModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({ message: 'Movie removed successfully' });
    } catch (error) {
        console.log("Error in removing movie ", error);
        return res.status(500).send({ message: 'Error while removing the movie' });
    }
}

const getMovies = async (req: Request, res: Response) => {
    try {
        const movies = await MovieModel.find({});
        return res.status(200).send(movies);
    } catch (error) {
        return res.status(500).send({message : "Error getting movies"})
    }
}

const getMovieById = async (req: Request, res: Response) => {
    try {
        const movie = await MovieModel.findById(req.params.id);
        return res.status(200).send(movie);
    } catch (error) {
        console.log("Error in getting movie ", error);
        return res.status(500).send({ message: 'Error while getting the movie' });
    }
}

export {
    addMovie,
    updateMovie,
    removeMovie,
    getMovieById,
    getMovies
}