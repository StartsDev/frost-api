import jwt from "jsonwebtoken";
import { UserAttributes } from "../interfaces/auth.interface";
import db from "../models";
require("dotenv").config();

const registerUser = async (user: UserAttributes) => {
  try {
    const findUser = await db.User.findOne({ where: { email: user.email } });
    if (findUser) {
      return {
        msg: "This user already exists",
      };
    }
    const newUser = await db.User.create(user);
    if (newUser === null) {
      return {
        msg: "Failed to register user",
      };
    }

    //enviar email para verificacion de cuenta con Nodemailer y Handlebars

    return {
      msg: "User created successfully. Please, verify your email to activate your account.",
      data: newUser,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

const loginUser = async (user: UserAttributes) => {
  try {
    //Type your code here...
    return {
      msg: "User logged",
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

export { registerUser, loginUser };
