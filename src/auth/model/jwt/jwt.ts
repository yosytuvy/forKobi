import { UserInterface } from "../../interface/user";
import jwt from "jsonwebtoken";
import "dotenv/config";

const key = process.env.JWT_SECRET as string;

export const generateAuthToken = (user: UserInterface) => {
  const { email, password } = user;
  const token = jwt.sign({ email, password }, key);
  return token;
};

export const verifyToken = (tokenFromClient: string) => {
  try {
    const userData = jwt.verify(tokenFromClient, key);
    return userData;
  } catch (error) {
    return null;
  }
};
