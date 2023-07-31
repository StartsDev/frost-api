import { Router } from "express";
import { createPassword } from "../controllers/password.controller";

const router = Router();

// Register new password
router.post("/create", createPassword);

export default router;

