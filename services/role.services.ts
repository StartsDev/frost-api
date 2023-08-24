const Role = require('../models/role')
import { RoleAttributes } from "../interfaces/role.interface";

// Create role
const createRoleServ = async (role: RoleAttributes) => {
  try {
    const findRole = await Role.findOne({ where: { role: role.role } });
    if (findRole) {
      return {
        msg: "Este rol ya existe...",
        succcess: false
      };
    }
    const newRole = await Role.create(role);
    if (!newRole) {
      return {
        msg: "Problemas al registrar el rol...",
        success: false
      };
    }
    return {
      msg: "Rol creado satisfactoriamente...",
      newRole,
      success: true
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

// Get all roles
const getRoleServ = async () => {
    try{
        const roles = await Role.findAll();
        return {
            roles,
            success: true
          };
    }catch(e){
      throw new Error(e as string);
    }
}

//Update role
const updateRoleServ = async (id: any, rol: any) => {
  try {
    const roleFound = await Role.findOne({ where: { id } });

    if (!roleFound) {
      return {
        msg: "Rol no encontrado",
        success: false,
      };
    }
    const [updateRole] = await Role.update(rol, {
      where: {
        id,
      },
      returning: true,
    });
    if (updateRole <= 0) {
      return {
        msg: "Actualización no realizada...",
        success: false,
      };
    }
    const role = await Role.findOne({ where: { id } });
    return {
      msg: "Rol actualizado satisfactoriamente...",
      role,
      success: true,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

//Delete role
const deleteRoleServ = async (rol: any) => {
  try {
    const role = await Role.destroy({
      where: {
        id: rol,
      },
    });
    if (!role) {
      return {
        msg: "Rol no registrado...",
        success: false,
      };
    }
    return {
      msg: "Rol eliminado...",
      success: true,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};


export { createRoleServ, getRoleServ, updateRoleServ, deleteRoleServ };
