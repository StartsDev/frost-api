import { Request, Response } from "express";
import { createRoleServ, getRoleServ } from "../services/role.services";

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
  try{
    const roles = await getRoleServ();
    res.status(200).json(roles);
  }catch(e){
    console.log(e);
  }
}

export { createRole, getRoles };
