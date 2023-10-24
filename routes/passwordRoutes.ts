import { Router } from "express";
import { createPassword, forgotPassword, VerifyRToken, newPassword } from "../controllers/password.controller";
import { verifyToken } from '../middleware/authjwt';

const router = Router();

// Register new password
router.post("/create", createPassword);

// Reset password
router.post('/reset-password',verifyToken, forgotPassword);

// Verify reset-token
router.post('/verify-reset-token/:token',verifyToken, VerifyRToken);

// New password
router.patch('/update-password', verifyToken, newPassword);

export default router;
