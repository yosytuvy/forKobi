import { UserInterface } from "../interface/user";
import { User } from "../model/mongose/userSchema";

export const getAllUsersFromMongoDB = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const insertUsers = async (user: UserInterface) => {
  try {
    const newUser = new User(user);
    const userFromDB = await newUser.save();
    return userFromDB;
  } catch (error) {
    if (error instanceof Error) return Promise.reject(error);
  }
};

export const deleteUserFromDB = async (id:string) => {
  try {
    const result = await User.deleteOne({
      _id: id
    });
  } catch (error) {
    if (error instanceof Error) return Promise.reject(error);
  }
}
