import { Router } from "express";
import { createPassword, newPassword, forgotPassword } from "../controllers/password.controller";
import { verifyToken } from "../middleware/authjwt";

const router = Router();

// Register new password
router.post("/create", createPassword);

//Forgot password
router.put("/forgot-password", forgotPassword);

// Create new password
router.put("/new-password", /*verifyToken,*/ newPassword);

export default router;
