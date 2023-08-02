import jwt from "jsonwebtoken";
const { Op } = require("sequelize");
import bcrypt from "bcrypt";
import { UserAttributes } from "../interfaces/auth.interface";
const Password = require("../models/password");
const User = require("../models/user");
require("dotenv").config();

const secretKey = process.env.SECRET_JWT;

const registerUser = async (user: UserAttributes) => {
  try {
    const findUser = await User.findOne({ where: { numIdent: user.numIdent } });
    if (findUser) {
      if (findUser.status) {
        await User.update(
          { status: false },
          {
            where: {
              numIdent: findUser.numIdent,
            },
          }
        );
        return {
          msg: "User created successfully. Please, verify your email to activate your account.",
        };
        // Notification email
      } else {
        return {
          msg: "This user already exists, check your details...",
        };
      }
    } else {
      const newUser = await User.create(user);
      if (newUser === null) {
        return {
          msg: "Failed to register user",
        };
      }
      return {
        msg: "User created successfully. Please, verify your email to activate your account.",
        user: newUser,
      };

    //enviar email para verificacion de cuenta con Nodemailer y Handlebars
    }
  } catch (e) {
    throw new Error(e as string);
  }
};

const loginUserServ = async (user: any) => {
  try {
    const foundUser = await User.findOne({
      where: { numIdent: user.numIdent },
    });
    if (!foundUser) {
      return {
        msg: "User not found...",
      };
    }
    const foundPassword = await Password.findOne({
      where: { userId: foundUser.id },
    });
    if (!foundPassword) {
      return {
        msg: "Password not registered to this user...",
      };
    }
    const isPasswordMatch = await bcrypt.compare(
      user.password,
      foundPassword.dataValues.password
    );
    if (!isPasswordMatch) {
      return {
        msg: "Authentication failed. Incorrect password.",
      };
    }
    const token = jwt.sign(
      {
        userId: foundUser.id,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
      },
      secretKey as string,
      {
        expiresIn: "1h",
      }
    );

    return {
      msg: "User logged succesfully...",
      token,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

export { registerUser, loginUserServ };
