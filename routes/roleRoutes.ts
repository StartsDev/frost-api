import { Router } from "express";
import { createRole, getRoles } from "../controllers/role.controllers";

const router = Router();

// Register new role
router.post("/create", createRole);

// Get roles
router.get("/get-roles", getRoles);

export default router;