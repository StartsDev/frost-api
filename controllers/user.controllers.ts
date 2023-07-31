import { Request, Response } from "express";
import { allUsers, getUserServ, allUserRolServ, updateUserServ, deleteUserServ } from "../services/user.services";

// Get all users
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await allUsers();
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      msg:"Error"
    });
  }
};

// Get user by id
const getUser = async (req: Request, res: Response) => {
  try {
    const user = await getUserServ(req.params.id);
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
};

// Get users by role
const getUsersRol = async(req: Request, res: Response)=>{
  try {
    const users = await allUserRolServ(req.params.rolId);
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
  }
}

// Update user
const editUser = async(req: Request, res: Response)=>{
  try {
    const user = await updateUserServ(req.params.id, req.body);
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
}

// Delete user
const deleteUser = async(req: Request, res: Response)=>{
  try {
    const user = await deleteUserServ(req.params.id);
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
}

export { getUsers, getUser, getUsersRol, editUser, deleteUser };
