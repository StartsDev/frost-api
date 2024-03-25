import { Request, Response } from "express";
import {
  allUsers,
  getUserServ,
  allUserRolServ,
  updateUserServ,
  deleteUserServ,
  allTechServ,
} from "../services/user.services";

// Get all users
const getUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || undefined; // Get the requested page from query parameter
    const pageSize = parseInt(req.query.pageSize as string) || undefined; // Get the requested page size from query parameter

    const { users, totalCount } = await allUsers(page, pageSize);
    if (!page && !pageSize) {
      res.status(200).json({
        users,
        numItmes: totalCount,
      });
    } else {
      const totalPages = Math.ceil(totalCount / (pageSize ?? totalCount));
      res.status(200).json({
        users,
        numItmes: totalCount,
        currentPage: page,
        totalPages,
      });
    }
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
    res.status(400).json({
      msg: "Error",
    });
  }
};

// Get user by id
const getUser = async (req: Request, res: Response) => {
  try {
    const user = await getUserServ(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

// Get users by role
const getUsersRol = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || undefined; // Get the requested page from query parameter
    const pageSize = parseInt(req.query.pageSize as string) || undefined; // Get the requested page size from query parameter

    const { usersRol, totalCount } = await allUserRolServ(
      req.params.rolId,
      page,
      pageSize
    );
    if (!page && !pageSize) {
      res.status(200).json({
        usersRol,
        numItmes: totalCount,
      });
    } else {
      const totalPages = Math.ceil(totalCount / (pageSize ?? totalCount));
      res.status(200).json({
        usersRol,
        totalItems: totalCount,
        currentPage: page,
        totalPages,
      });
    }
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

// Update user
const editUser = async (req: any, res: Response) => {
  try {
    const user = await updateUserServ(req.params.id, req.body, req.token);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

// Delete user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await deleteUserServ(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

//Get all tech
const getAllTech = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || undefined; // Get the requested page from query parameter
    const pageSize = parseInt(req.query.pageSize as string) || undefined; // Get the requested page size from query parameter

    const { users, totalCount } = await allTechServ(page, pageSize);
    if (!page && !pageSize) {
      res.status(200).json({
        users,
        numItmes: totalCount,
      });
    } else {
      const totalPages = Math.ceil(totalCount / (pageSize ?? totalCount));
      res.status(200).json({
        users,
        numItmes: totalCount,
        currentPage: page,
        totalPages,
      });
    }
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
    res.status(400).json({
      msg: "Error",
    });
  }
};
export { getUsers, getUser, getUsersRol, editUser, deleteUser, getAllTech };
