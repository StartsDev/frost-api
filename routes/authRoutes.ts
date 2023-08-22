import { Router } from "express";
import { createUser, loginUser, getUserInfo } from "../controllers/auth.controllers";
import { verifyToken } from '../middleware/authjwt';


const router = Router();
//Auth

// Register new user
router.post("/register", createUser);

// Login user
router.post("/login", loginUser);

// Get user info (Home page)
router.get("/get-user-info", verifyToken, getUserInfo);

// Reset password

// Update password

export default router;
