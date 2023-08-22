import { Router } from "express";
import { createPassword } from "../controllers/password.controller";
import { verifyToken, isSuperUser } from '../middleware/authjwt';

const router = Router();

// Register new password
router.post("/create", verifyToken, createPassword);

// Update password

//(Ingresa la vieja clave e ingresa la nueva?)
export default router;

