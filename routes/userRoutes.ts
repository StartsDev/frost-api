import { Router } from "express";
import { upImgAvatar } from "../controllers/avatarUser.controllers";
import {
  getUsers,
  getUser,
  getUsersRol,
  editUser,
  deleteUser,
  getAllTech,
} from "../controllers/user.controllers";
import { verifyToken } from "../middleware/authjwt";


const router = Router();

//User
//Get all users
router.get("/get-users", getUsers);

//Get a single user
router.get("/get-user/:id", getUser);

// Get all users by rol
router.get("/get-users-rol/:rolId", getUsersRol);

//Update user
router.patch("/update-user/:id", verifyToken, editUser);

//Delete user
router.patch("/delete-user/:id", verifyToken, deleteUser);

//Update avatar user
router.post("/upload-avatar-user/:id", verifyToken, upImgAvatar);

// User tech to bussiness core
// Get tech
router.get("/get-all-tech", getAllTech);

//Get a single tech
router.get("/get-tech/:id", getUser);

//Update user
router.patch("/update-tech/:id", verifyToken, editUser);

//Delete user
router.patch("/delete-tech/:id", verifyToken, deleteUser);

export default router;
