import { Router } from "express";
import { createUser, loginUser, getUserInfo, bulkCreateController } from "../controllers/auth.controllers";
import { verifyToken } from '../middleware/authjwt';


const router = Router();
//Auth

// Register new user
router.post("/register", createUser);

//bulkCreate
router.post("/bulk-create", bulkCreateController);

// Login user
router.post("/login", loginUser);

// Get user info (Home page)
router.get("/get-user-info", verifyToken, getUserInfo);

// Reset password

// Update password

export default router;
