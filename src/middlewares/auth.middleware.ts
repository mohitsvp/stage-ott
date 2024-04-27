import { Request, Response, NextFunction } from 'express';
import { decodeToken } from '../utils/jwtToken';

interface RequestWithUser extends Request {
    user: any; 
}

const authenticate = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (token) {
        const user = decodeToken(token);
        if (user) {
            req.user = user;
            next();
        } else {
            return res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    }
};


export default authenticate