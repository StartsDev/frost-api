import jwt from "jsonwebtoken";
const { Op } = require("sequelize");
import bcrypt from "bcrypt";
import { bulkCreatefunction } from "../utils/bulkCreate";
//import path from "path";
const hbs = require("nodemailer-express-handlebars");
const transporter = require("../mailer/mailer");
const Password = require("../models/password");
const User = require("../models/user");
const Role = require("../models/role");
const Identification = require("../models/identification");
const { MESSAGE_AUTH} = require("../utils/constant")

require("dotenv").config();

const secretKey = process.env.SECRET_JWT;

const registerUser = async (user: any) => {
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
          msg: MESSAGE_AUTH.userCreated,
          success: true
        };
        // Notification email
      } else {
        return {
          msg: MESSAGE_AUTH.userPreviousRegistered,
          success: false
        };
      }
    } else {
      const userEmail = await User.findOne({
        where: { email: user.email }
      })
      if (userEmail) {
        return {
          msg: MESSAGE_AUTH.emailExist,
          success: false
        };
      }
      const foundIdentId = await Identification.findOne({ where: { id: user.identId } });
      if (!foundIdentId) {
        return {
          msg: MESSAGE_AUTH.idNotExist,
          success: false
        }
      }
      const foundRolId = await Role.findOne({ where: { id: user.roleId } });
      if (!foundRolId) {
        return {
          msg: MESSAGE_AUTH.roleNotExist,
          success: false
        }
      }
      const newUser = await User.create(user);

     /*  // Notification by email
      const handlebarOptions = {
        viewEngine: {
          extName: ".handlebars",
          partialsDir: path.resolve("./views"),
          defaultLayout: false,
        },
        viewPath: path.resolve("./views"),
        extName: ".handlebars",
      };
  
      transporter.use("compile", hbs(handlebarOptions));
  
      const notification = await transporter.sendMail({
        from: `'"Admon Aires S.A.S 👻" <${process.env.EMAIL_ACCOUNT}>'`, // sender address
        to: user.email, // list of receivers
        subject: "Notificación registro de usuarios Aires S.A.S ✔", // Subject line
        template: "newUser",
        context: {
          title: "Bienvenido a Aires S.A.S",
          text: `${user.firstName} ${user.lastName} ya hace parte del sistema Aires S.A.S, para poder ingresar a la plataforma debe solicitar la asignación de su contraseña.`,
          textFoot:
            "Por favor comunicarse con soporte de Aires S.A.S si tiene algun problema...",
        },
      });
      if (!notification) {
        return {
          msg: "La notificación no pudo ser enviada...",
          success: false,
        };
      } */
      return {
        //msg: "Usuario creado satisfactoriamente. Por favor verificar su email",
        msg: MESSAGE_AUTH.userCreated,
        newUser,
        success: true
      };
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
        msg: MESSAGE_AUTH.userNotFound,
        success: false
      };
    }
    const foundPassword = await Password.findOne({
      where: { userId: foundUser.id },
    });
    if (!foundPassword) {
      return {
        msg: MESSAGE_AUTH.passwordNotAsigned,
        success: false
      };
    }
    const isPasswordMatch = await bcrypt.compare(
      user.password,
      foundPassword.dataValues.password
    );
    if (!isPasswordMatch) {
      return {
        msg: MESSAGE_AUTH.incorrectPassword,
        success: false
      };
    }

    const token = jwt.sign(
      {
        userId: foundUser.id,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        numIdent: foundUser.numIdent,
        email: foundUser.email,
      },
      secretKey as string,
      {
        expiresIn: "30d",
      }
    );

    return {
      msg: MESSAGE_AUTH.userLogued,
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
        msg: MESSAGE_AUTH.userNotFound,
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

const bulkCreateUser = async (data: Array<{}>) => {
  try {
    await bulkCreatefunction(User, data)
    return MESSAGE_AUTH.userCreated
  } catch (error) {
    console.log(error);
    return {
      message: MESSAGE_AUTH.creationError,
      success: false,
    }
  }
}



export { registerUser, loginUserServ, getUserServ, bulkCreateUser };
