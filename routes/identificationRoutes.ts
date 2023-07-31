import { Router } from "express";
import { createIdentification, getIdentifications } from "../controllers/identification.controllers";

const router = Router();

// Register new role
router.post("/create", createIdentification);

// Get roles
router.get("/get-identifications", getIdentifications);

export default router;


