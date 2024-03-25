import { users } from "./../seeders/users";
const User = require("../models/user");
const Identification = require("../models/identification");
const Role = require("../models/role");
import axios from "axios";

const allUsers = async (page?: number, pageSize?: number) => {
  try {
    let users;
    if (page && pageSize) {
      const offset = (page - 1) * pageSize;
      users = await User.findAll({
        offset,
        limit: pageSize,
        where: { status: false },
        attributes: { exclude: ["updatedAt"] },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Identification,
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          },
          {
            model: Role,
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          },
        ],
      });

      if (!users) {
        return {
          msg: "No existen usuarios registrados...",
          users,
          success: false,
        };
      }
      const totalCount = await User.count({ where: { status: false } });
      return {
        users,
        totalCount,
        success: true,
      };
    } else {
      users = await User.findAll({
        where: { status: false },
        attributes: { exclude: ["updatedAt"] },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Identification,
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          },
          {
            model: Role,
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          },
        ],
      });

      if (!users) {
        return {
          msg: "No existen usuarios registrados...",
          users,
          success: false,
        };
      }
      const totalCount = await User.count({ where: { status: false } });
      return {
        users,
        totalCount,
        success: true,
      };
    }
  } catch (e) {
    throw new Error(e as string);
  }
};

const getUserServ = async (user: any) => {
  try {
    const findUser = await User.findOne({
      where: { id: user },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Identification,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        },
        {
          model: Role,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        },
      ],
    });
    if (!user) {
      return {
        msg: "Este usuario no existe...",
        success: false,
      };
    }
    return {
      findUser,
      success: true,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

const allUserRolServ = async (user: any, page?: number, pageSize?: number) => {
  try {
    let usersRol;
    if (page && pageSize) {
      const offset = (page - 1) * pageSize;
      usersRol = await User.findAll({
        offset,
        limit: pageSize,
        where: { roleId: user },
        attributes: { exclude: ["updatedAt"] },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Identification,
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          },
          {
            model: Role,
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          },
        ],
      });
      if (!usersRol) {
        return {
          msg: "No existen usuarios con este rol...",
          users,
          success: false,
        };
      }

      const totalCount = await User.count({
        where: { status: false, roleId: user },
      });

      return {
        usersRol,
        totalCount,
        success: true,
      };
    } else {
      usersRol = await User.findAll({
        where: { roleId: user },
        attributes: { exclude: ["updatedAt"] },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Identification,
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          },
          {
            model: Role,
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          },
        ],
      });
      if (!usersRol) {
        return {
          msg: "No existen usuarios con este rol...",
          users,
          success: false,
        };
      }

      const totalCount = await User.count({
        where: { status: false, roleId: user },
      });

      return {
        usersRol,
        totalCount,
        success: true,
      };
    }
  } catch (e) {
    throw new Error(e as string);
  }
};

const updateUserServ = async (id: any, userp: any, token: any) => {
  const URL = process.env.URL_PRODUCTION_CORE || process.env.URL_DEVELOP_CORE;
  const baseUrlPatchCustomer = `${URL}/client/update-client`;
  const baseUrlGetCustomer = `${URL}/client/get-client`;
  try {
    const { numIdent, firstName, lastName, email, phone, identId, roleId, clientId, status, deleteClient } = userp;
    if(deleteClient) {
      try {
        const [updateUser] = await User.update(
          { numIdent, firstName, lastName, email, phone, identId, roleId, clientId: null, status },
          {
            where: {
              id,
            },
            returning: true,
          }
        );
        const {data} = await axios.get(`${baseUrlGetCustomer}/${clientId}`)
        const userAppArray = data.client?.client?.user_app?.filter((c: any) => c.user_id !== id)
        await axios.patch(`${baseUrlPatchCustomer}/${clientId}`, {
          ...data.client.client,
          user_app: userAppArray,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'x-token': token
          }
        });
        if (!updateUser) {
          return {
            msg: "Usuario no válido...",
            success: false,
          };
        }
        if (updateUser <= 0) {
          return {
            msg: "Actualización no realizada...",
            success: false,
          };
        }
      } catch (error) {
        console.log('error: ', error )
        throw ('ERROR: ' + error)
      }
    } else {
      const [updateUser] = await User.update(
        { numIdent, firstName, lastName, email, phone, identId, roleId, clientId, status },
        {
          where: {
            id,
          },
          returning: true,
        }
      );
      if (!updateUser) {
        return {
          msg: "Usuario no válido...",
          success: false,
        };
      }
      if (updateUser <= 0) {
        return {
          msg: "Actualización no realizada...",
          success: false,
        };
      }
      const user = await User.findOne({ where: { id } });
      return {
        msg: "Usuario actualizado satisfactoriamente...",
        user,
        success: true,
      };
    }
    
  } catch (e) {
    throw new Error(e as string);
  }
};

const deleteUserServ = async (id: any) => {
  try {
    const findUser = await User.findOne({ where: { id } });
    if (findUser.status) {
      return {
        msg: "User no válido...",
        success: false,
      };
    }
    const deletedUser = await User.update(
      { status: true },
      {
        where: {
          id,
        },
      }
    );
    if (!deletedUser) {
      return {
        msg: "User no válido...",
        success: false,
      };
    }
    return {
      msg: "Usuario eliminado satisfactoriamente...",
      success: true,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

//Tech
const allTechServ = async (page?: number, pageSize?: number) => {
  try {
    let users;
    if (page && pageSize) {
      const offset = (page - 1) * pageSize;
      users = await User.findAll({
        offset,
        limit: pageSize,
        where: { status: false },
        attributes: { exclude: ["updatedAt"] },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Identification,
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          },
          {
            model: Role,
            where: { role: "Tecnico", status: false },
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          },
        ],
      });

      if (!users) {
        return {
          msg: "No existen usuarios registrados...",
          users,
          success: false,
        };
      }
      const totalCount = await User.count({ where: { status: false } });
      return {
        users,
        totalCount,
        success: true,
      };
    } else {
      users = await User.findAll({
        where: { status: false },
        attributes: { exclude: ["updatedAt"] },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Identification,
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          },
          {
            model: Role,
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          },
        ],
      });

      if (!users) {
        return {
          msg: "No existen usuarios registrados...",
          users,
          success: false,
        };
      }
      const totalCount = await User.count({ where: { status: false } });
      return {
        users,
        totalCount,
        success: true,
      };
    }
  } catch (e) {
    throw new Error(e as string);
  }
};
export {
  allUsers,
  getUserServ,
  allUserRolServ,
  updateUserServ,
  deleteUserServ,
  allTechServ
};
