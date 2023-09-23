import { users } from "./../seeders/users";
const User = require("../models/user");
const Identification = require("../models/identification");
const Role = require("../models/role");

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

const updateUserServ = async (id: any, userp: any) => {
  try {
    const { numIdent, firstName, lastName, email, phone, identId, roleId, clientId } =
      userp;
    
    const [updateUser] = await User.update(
      { numIdent, firstName, lastName, email, phone, identId, roleId, clientId },
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
