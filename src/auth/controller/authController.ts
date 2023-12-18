import { UserInterface } from "../interface/user";
import userValidation from "../model/joi/userValidertion";
import { Request, Response } from "express";
import { deleteUser, login, register } from "../service/authService";
import { handleError } from "../../utils/handleErrors";

export const handleUserRegistration = async (req: Request, res: Response) => {
  try {
    const user: UserInterface = req.body;
    const { error } = userValidation(user);
    if (error?.details[0].message) throw new Error(error?.details[0].message);
    const userFromDB = await register(user);
    return res.status(201).send(userFromDB);
  } catch (error) {
    if (error instanceof Error) handleError(res, error);
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const userFromClient: UserInterface = req.body;

    const { error } = userValidation(userFromClient);
    if (error?.details[0].message) throw new Error(error?.details[0].message);

    const token = await login(userFromClient);

    return res.send(token);
  } catch (error) {
    handleError(res, error, 401);
  }
};

export const handleDelete = async (req:Request, res:Response) => {
  try {
    const {id} = req.body;
    await deleteUser(id);
    res.send(id);
  } catch (error) {
    handleError(res, error, 401);
  }
}