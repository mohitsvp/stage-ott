import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "stage";

export const createToken = (
  payload: object,
  expiresIn: string | number = "1h"
): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

export const decodeToken = (token: string): any => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
