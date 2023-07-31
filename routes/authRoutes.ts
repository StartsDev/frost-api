import { Router } from "express";
import { createUser, loginUser } from "../controllers/auth.controllers";
//Implement midleware to access / authorization / validations

const router = Router();
//Auth

// Register new user
router.post("/register", createUser);

// Login user
router.post("/login", loginUser);

// Reset password

// Update password

export default router;
