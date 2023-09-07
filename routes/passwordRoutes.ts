import { Router } from "express";
import { createPassword, forgotPassword, VerifyRToken, newPassword } from "../controllers/password.controller";
import { verifyToken, isSuperUser } from '../middleware/authjwt';

const router = Router();

// Register new password
router.post("/create", createPassword);

// Reset password
router.post('/reset-password',verifyToken, isSuperUser, forgotPassword);

// Verify reset-token
router.post('/verify-reset-token/:token',verifyToken, isSuperUser, VerifyRToken);

// New password
router.patch('/update-password', verifyToken, isSuperUser, newPassword);

export default router;
