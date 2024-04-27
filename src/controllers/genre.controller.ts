import { Request, Response } from 'express';
import GenreModel from '../models/genre.model';

const addGenre = async (req: Request, res: Response) => {
    try {
        let genre = new GenreModel(req.body);
        genre = await genre.save();
        return res.status(201).send({ message: 'Genre added successfully', _id :  genre._id});
    } catch (error) {
        console.log("Error in adding genre ", error);
        return res.status(500).send({ message: 'Error while adding the genre' });
    }
}

const updateGenre = async (req: Request, res: Response) => {
    try {
        const genre = await GenreModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).send(genre);
    } catch (error) {
        console.log("Error in updating genre ", error);
        return res.status(500).send({ message: 'Error while updating the genre' });
    }
}

const removeGenre = async (req: Request, res: Response) => {
    try {
        await GenreModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({ message: 'genre removed successfully' });
    } catch (error) {
        console.log("Error in removing genre ", error);
        return res.status(500).send({ message: 'Error while removing the genre' });
    }
}

const getGenre = async (req: Request, res: Response) => {
    try {
        const genres = await GenreModel.find({});
        return res.status(200).send(genres);
    } catch (error) {
        return res.status(500).send({message : "Error getting genres"})
    }
}

const getGenreById = async (req: Request, res: Response) => {
    try {
        const genre = await GenreModel.findById(req.params.id);
        return res.status(200).send(genre);
    } catch (error) {
        console.log("Error in getting genre ", error);
        return res.status(500).send({ message: 'Error while getting the genre' });
    }
}

export {
    addGenre,
    updateGenre,
    removeGenre,
    getGenreById,
    getGenre
}