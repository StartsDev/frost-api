import { Request, Response } from "express";
import { CustomRequest } from "../middleware/authjwt";
import {
  createNewPasswordServ,
  createPwdServ,
  forgotPasswordsServ,
  verifyResetToken,
} from "../services/password.services";

//Register new role
const createPassword = async (req: Request, res: Response) => {
  try {
    const password = await createPwdServ(req.body);
    res.status(200).json(password);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

//Update password notification email
const forgotPassword = async (req: CustomRequest, res: Response) => {
  try {
    const { email } = req.body;
    const password = await forgotPasswordsServ(email);
    res.status(200).json(password);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

//Verify reset token
const VerifyRToken = async (req: CustomRequest, res: Response) => {
  try {
    const { token } = req.params;
    const verifyToken = await verifyResetToken(token);
    res.status(200).json(verifyToken);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

//Create new password password
const newPassword = async (req: CustomRequest, res: Response) => {
  try {
    const { password } = req.body;
    const tokenArray = req.headers["reset-token"] || req.headers.authorization;
    const updatedPassword = await createNewPasswordServ(tokenArray, password);
    res.status(200).json(updatedPassword);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

export { createPassword, forgotPassword, VerifyRToken, newPassword };
