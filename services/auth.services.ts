import jwt from "jsonwebtoken";
const { Op } = require("sequelize");
import bcrypt from "bcrypt";
import { UserAttributes } from "../interfaces/auth.interface";
const Password = require("../models/password");
const User = require("../models/user");
const Role = require("../models/role");
const Identification = require("../models/identification");

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
          msg: "Usuario creado satisfactoriamente. Por favor verificar su correo...",
          success: true
        };
        // Notification email
      } else {
        return {
          msg: "Este usuario ya esta registrado...",
          success: false
        };
      }
    } else {
      const newUser = await User.create(user);
      
      return {
        msg: "Usuario creado satisfacotriamente. Por favor verificar su email",
        newUser,
        success: true
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
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Identification,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        },
        {
          model: Role,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        },
      ],
    });
    if (!foundUser) {
      return {
        msg: "Usuario no encontrado...",
        success: false
      };
    }
    const foundPassword = await Password.findOne({
      where: { userId: foundUser.id },
    });
    if (!foundPassword) {
      return {
        msg: "El password no ha sido asignado a este usuario...",
        success: false
      };
    }
    const isPasswordMatch = await bcrypt.compare(
      user.password,
      foundPassword.dataValues.password
    );
    if (!isPasswordMatch) {
      return {
        msg: "Clave incorrecta...",
        success: false
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
        expiresIn: "30d",
      }
    );

    return {
      msg: "Usuario logueado satisfactoriamente...",
      token,
      user: foundUser,
      success: true
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

const getUserServ = async (user: any, token: any) => {
  try {
    const findUser = await User.findOne({
      where: { id: user.userId },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Identification,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        },
        {
          model: Role,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        },
      ],
    });
    if (!user) {
      return {
        msg: "Este usuario no existe",
        success: false
      };
    }
    return {
      user: findUser,
      token,
      succes: true
    }; 
  } catch (e) {
    throw new Error(e as string);
  }
};

export { registerUser, loginUserServ, getUserServ };
