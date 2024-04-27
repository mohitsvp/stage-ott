import userModel from '../models/user.model';
import { Request, Response } from 'express';
import { createToken } from '../utils/jwtToken';

const registerUser = async (req : Request, res : Response) => {
    try {
        const {username, password} = req.body;
        const user = new userModel({username, password});
        await user.save();
        return res.status(201).send({message : 'User registered successfully'})
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