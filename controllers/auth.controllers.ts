import { Request, Response } from "express";
import { registerUser, loginUserServ, getUserServ } from "../services/auth.services";
import { CustomRequest } from "../middleware/authjwt";

//Register new user
const createUser = async (req: Request, res: Response) => {
  try {
    const data = await registerUser(req.body);
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
};

//Login user
const loginUser = async (req: Request, res: Response) => {
  try {
    const data = await loginUserServ(req.body);
    res.status(201).json(data);
  } catch (e) {
    console.log(e);
  }
};

//Get user info
const getUserInfo = async (req: CustomRequest, res: Response) => {
  try {
    const data = await getUserServ(req.decoded, req.token);
    res.status(201).json(data);
  } catch (e) {
    console.log(e);
  }
};

export { createUser, loginUser, getUserInfo };
