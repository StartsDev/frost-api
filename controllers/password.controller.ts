import { Request, Response } from "express";
import { CustomRequest } from "../middleware/authjwt";
import { createPwdServ } from "../services/password.services";

//Register new role
const createPassword = async (req: Request, res: Response) => {
  try {
    const password = await createPwdServ(req.body);
    res.status(200).json(password);
  } catch (e) {
    console.log(e);
  }
};

//Update password notification email
const forgotPassword = async (req: CustomRequest, res: Response) => {
  try {
    //const password = await updatePwdServ(req.body);
    console.log('Hello ',req.decoded)
    res.status(200).json({ msg: "Password notification..." });
  } catch (e) {
    console.log(e);
  }
};

//Create new password password
const newPassword = async (req: CustomRequest, res: Response) => {
  try {
    //const password = await updatePwdServ(req.body);
    console.log('Hello ',req.decoded)
    res.status(200).json({ msg: "Password created..." });
  } catch (e) {
    console.log(e);
  }
};

export { createPassword, forgotPassword, newPassword  };

/*  */
