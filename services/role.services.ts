const Role = require('../models/role')
import { RoleAttributes } from "../interfaces/role.interface";

const createRoleServ = async (role: RoleAttributes) => {
  try {
    const findRole = await Role.findOne({ where: { role: role.role } });
    if (findRole) {
      return {
        msg: "This role already exists",
      };
    }
    const newRole = await Role.create(role);
    if (newRole === null) {
      return {
        msg: "Failed to register role",
      };
    }
    return {
      msg: "Role created successfully...",
      data: newRole,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

const getRoleServ = async () => {
    try{
        const roles = await Role.findAll();
        return {
            data: roles
          };
    }catch(e){
      throw new Error(e as string);
    }
}


export { createRoleServ, getRoleServ };
