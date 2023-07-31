import { Request, Response } from "express";
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

export { createPassword }

/*  */