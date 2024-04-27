import userModel from '../models/user.model';
import { Request, Response } from 'express';
import { createToken } from '../utils/jwtToken';
import dotenv from "dotenv"

dotenv.config()

const registerUser = async (req : Request, res : Response) => {
    try {
        const {username, password} = req.body;
        console.log(process.env.MONGODB_URI)
        const user = new userModel({username, password});
        await user.save();
        const token = createToken({userId : user._id})
        console.log("USER REGISTERED")
        res.cookie('token', token, { httpOnly: true });
        return res.status(200).send({token})
    } catch (error) {
        console.log("Error in registering user ", error)
        return res.status(500).send({message : 'Error while registering the user'})
    }
}

const verifyUser = async (req: Request, res : Response) => {
    try {
        const {username, password} = req.body;
        let user = await userModel.findOne({username});
        if (!user || !(await user.checkPassword(password))) {
            return res.status(401).send('Invalid username or password');   
        }
        const token = createToken({userId : user._id})
        res.cookie('token', token, { httpOnly: true });
        return res.status(200).send({token})
    } catch (error) {
        console.log("Error in registering user ", error)
        return res.status(500).send({message : 'Error while logging the user'})
    }
}

export {
    registerUser,
    verifyUser
}