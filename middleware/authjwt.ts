import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
import { getUserServ } from "../services/user.services";

require("dotenv").config();

const secretKey = process.env.SECRET_JWT;
const super_user = process.env.SUPER_USER;
const admin = process.env.ADMIN;

// estructura de los datos decodificados del token:
interface DecodedToken {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

// Extiende la interfaz de Request para incluir la propiedad 'decoded':
export interface CustomRequest extends Request {
  decoded?: DecodedToken;
  token?: any;
}

export const verifyToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    //Obtener token del encabezado de autorización
    const tokenArray = req.headers["x-token"] || req.headers.authorization;
    //Verificamos si el token es asignado
    if (!tokenArray) {
      return res.status(403).json({ message: "No token delivered" });
    }

    // Verificamos y decodificamos el token
    jwt.verify(tokenArray, secretKey, (err: any, decoded: DecodedToken) => {
      if (err) {
        return res.status(403).json({ mensaje: "Invalid Token" });
      }
      // Agregar los datos decodificados a la solicitud para que puedan ser utilizados en los controladores
      req.decoded = decoded;
      req.token = tokenArray;

      // Llama a la siguiente función del middleware
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", error });
  }
};

// Verificamos si el rol del usuario es Administrador o Super_Usuario
export const isSuperUser_isAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.decoded?.userId;
    const user = await getUserServ(id);
    if (
      user.findUser.dataValues.Role.dataValues.role !== super_user &&
      user.findUser.dataValues.Role.dataValues.role !== admin
    )
      return res.status(401).json({
        message: "El rol de usuario no es super usuario o administrador",
      });
    next();
  } catch (error) {
    return res.status(401).json({ error });
  }
};

export const isSuperUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.decoded?.userId;
    const user = await getUserServ(id);
    if (user.findUser.dataValues.Role.dataValues.role !== super_user)
      return res
        .status(401)
        .json({ message: "El rol de usuario no es super usuario" });
    next();
  } catch (error) {
    return res.status(401).json({ error });
  }
};
