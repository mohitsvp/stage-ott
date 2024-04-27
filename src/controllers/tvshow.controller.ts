import { Request, Response } from 'express';
import TvShowModel from '../models/tvshow.model';

const addtvshow = async (req: Request, res: Response) => {
    try {
        let tvshow = new TvShowModel(req.body);
        tvshow = await tvshow.save();
        return res.status(201).send({ message: 'TV Show added successfully', _id : tvshow._id });
    } catch (error) {
        console.log("Error in adding tvshow ", error);
        return res.status(500).send({ message: 'Error while adding the tvshow' });
    }
}

const updatetvshow = async (req: Request, res: Response) => {
    try {
        const tvshow = await TvShowModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).send(tvshow);
    } catch (error) {
        console.log("Error in updating tvshow ", error);
        return res.status(500).send({ message: 'Error while updating the tvshow' });
    }
}

const removetvshow = async (req: Request, res: Response) => {
    try {
        await TvShowModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({ message: 'TV Show removed successfully' });
    } catch (error) {
        console.log("Error in removing tvshow ", error);
        return res.status(500).send({ message: 'Error while removing the tvshow' });
    }
}

const gettvshow = async (req: Request, res: Response) => {
    try {
        const tvshows = await TvShowModel.find({});
        return res.status(200).send(tvshows);
    } catch (error) {
        return res.status(500).send({message : "Error getting tvshows"})
    }
}

const gettvshowById = async (req: Request, res: Response) => {
    try {
        const tvshow = await TvShowModel.findById(req.params.id);
        return res.status(200).send(tvshow);
    } catch (error) {
        console.log("Error in getting tvshow ", error);
        return res.status(500).send({ message: 'Error while getting the tvshow' });
    }
}

export {
    addtvshow,
    updatetvshow,
    removetvshow,
    gettvshowById,
    gettvshow
}