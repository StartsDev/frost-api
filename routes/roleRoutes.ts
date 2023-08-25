import { Router } from "express";
import {
  createRole,
  getRoles,
  updateRole,
  deleteRole,
} from "../controllers/role.controllers";
import { verifyToken, isSuperUser } from "../middleware/authjwt";

const router = Router();

// Register role
router.post("/create", /**verifyToken*/ /*isSuperUser*/ createRole);

// Get roles
router.get("/get-roles", getRoles);

// Update role
router.put("/update-role/:id", verifyToken, isSuperUser, updateRole);

//Delete role
router.delete("/delete-role/:id", verifyToken, isSuperUser, deleteRole);

export default router;
