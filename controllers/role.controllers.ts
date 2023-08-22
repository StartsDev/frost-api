import { Request, Response } from "express";
import {
  createRoleServ,
  getRoleServ,
  updateRoleServ,
  deleteRoleServ,
} from "../services/role.services";

//Register new role
const createRole = async (req: Request, res: Response) => {
  try {
    const role = await createRoleServ(req.body);
    res.status(200).json(role);
  } catch (e) {
    console.log(e);
  }
};

const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await getRoleServ();
    res.status(200).json(roles);
  } catch (e) {
    console.log(e);
  }
};

//Update role
const updateRole = async (req: Request, res: Response) => {
  try {
    const identification = await updateRoleServ(req.params.id, req.body);
    res.status(200).json(identification);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

// Delete role
const deleteRole = async (req: Request, res: Response) => {
  try {
    const identifications = await deleteRoleServ(req.params.id);
    res.status(200).json(identifications);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

export { createRole, getRoles, updateRole, deleteRole };
