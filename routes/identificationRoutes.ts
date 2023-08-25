import { Router } from "express";
import {
  createIdentification,
  getIdentifications,
  updateIdentification,
  deleteIdentification,
} from "../controllers/identification.controllers";
import { verifyToken, isSuperUser } from "../middleware/authjwt";

const router = Router();

// Register identification
router.post("/create", /*verifyToken*//*isSuperUser*/ createIdentification);

// Get identification
router.get("/get-identifications", getIdentifications);

// Update identification
router.put("/update-identification/:id", verifyToken, isSuperUser, updateIdentification);

//Delete identification
router.delete("/delete-identification/:id", verifyToken, isSuperUser, deleteIdentification);

export default router;
