import { Router } from "express";
import { createPassword } from "../controllers/password.controller";

const router = Router();

// Register new password
router.post("/create", createPassword);

// Update password


export default router;

