import { Router } from "express";
import { getUsers, getUser, getUsersRol, editUser, deleteUser } from "../controllers/user.controllers";


const router = Router();


//User
//Get all users
router.get('/get-users', getUsers);

//Get a single user
router.get('/get-user/:id', getUser);

// Get all users by rol
router.get('/get-users-rol/:rolId', getUsersRol);

//Update user
router.patch('/update-user/:id', editUser)

//Delete user
router.patch('/delete-user/:id', deleteUser)

export default router;