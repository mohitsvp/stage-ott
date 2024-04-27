import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const SECRET_KEY: Secret = process.env.JWT_SECRET || "stage";

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '');

   if (!token) {
    console.log('No Authorization header');
    throw new Error("No Authorization header");
  }

   const decoded = jwt.verify(token, SECRET_KEY);
   
   (req as CustomRequest).token = decoded;

   next();
 } catch (err) {
   res.status(401).send('Please authenticate');
 }
};

export default authenticate