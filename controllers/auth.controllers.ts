import { Request, Response } from "express";
import { registerUser, loginUserServ, getUserServ, bulkCreateUser } from "../services/auth.services";
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
const bulkCreateController = async (req: Request, res: Response) => {
  try {
    const data = await bulkCreateUser(req.body);
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: 'hubo un error',
      success: false,
      error: e
    })
    
  }
};

//Login user
const loginUser = async (req: Request, res: Response) => {
  try {
    const data = await loginUserServ(req.body);
    res.status(201).json(data);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: 'hubo un error',
      success: false,
      error: e
    })
  }
};

//Get user info
const getUserInfo = async (req: CustomRequest, res: Response) => {
  try {
    const data = await getUserServ(req.decoded, req.token);
    res.status(201).json(data);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: 'hubo un error',
      success: false,
      error: e
    })
  }
};

export { createUser, loginUser, getUserInfo, bulkCreateController };
