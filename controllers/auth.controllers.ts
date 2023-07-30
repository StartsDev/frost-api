import { Request, Response } from "express";
import { registerUser } from "../services/auth.services";

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
    const { password, email } = req.body;
    console.log('PASSWORD ', password)
    console.log('email ', email)
    res.status(201).json({ msg: "User login succeful" });
  } catch (e) {
    console.log(e);
    //instanceOfError(res, error, 404)
  }
};
export { createUser, loginUser };
