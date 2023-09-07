import { Router } from "express";
import { upImgEquip } from "../controllers/avatarUser.controllers";
import { getUsers, getUser, getUsersRol, editUser, deleteUser } from "../controllers/user.controllers";
import { verifyToken } from "../middleware/authjwt";

const router = Router();


//User
//Get all users
router.get('/get-users', getUsers);

//Get a single user
router.get('/get-user/:id', getUser);

// Get all users by rol
router.get('/get-users-rol/:rolId', getUsersRol);

//Update user
router.patch('/update-user/:id', verifyToken, editUser)

//Delete user
router.patch('/delete-user/:id', verifyToken, deleteUser)

//Update avatar user
router.post("/upload-avatar-user/:id", verifyToken, upImgEquip);

export default router;