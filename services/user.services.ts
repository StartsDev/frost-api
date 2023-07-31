import db from "../models";

const allUsers = async () => {
  try {
    const users = await db.User.findAll({
      where: { status: false },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: db.Identification,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        },
        {
          model: db.Role,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        },
      ],
    });
    return {
      users,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

const getUserServ = async (user: any) => {
  try {
    const findUser = await db.User.findOne({
      where: { id: user },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: db.Identification,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        },
        {
          model: db.Role,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        },
      ],
    });
    if (!user) {
      return {
        msg: "This user doesn't exist",
      };
    }
    return {
      user: findUser,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

const allUserRolServ = async (user: any) => {
  try {
    const usersRol = await db.User.findAll({
      where: { roleId: user },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: db.Identification,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        },
        {
          model: db.Role,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        },
      ],
    });
    if (!usersRol) {
      return {
        msg: "Users does exist with that role",
        users: [],
      };
    }
    return { users: usersRol };
  } catch (e) {
    throw new Error(e as string);
  }
};

const updateUserServ = async (id: any, user: any) => {
  try {
    const {numIdent,firstName, lastName, email, phone, identId, roleId} = user
    const [updateUser] = await db.User.update(
      { numIdent, firstName, lastName, email, phone, identId, roleId},
      {
        where: {
          id,
        },
        returning: true,
      }
    );
    if (!updateUser) {
      return {
        msg: "User no valid",
      };
    }
    return {
      msg: "User updated succesfully"
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

const deleteUserServ = async (id: any) => {
  try {
    const deletedUser = await db.User.update(
      { status: true},
      {
        where: {
          id,
        },
      }
    );
    if (!deletedUser) {
      return {
        msg: "User no valid",
      };
    }
    return {
      msg: "User deleted succesfully",
    };
  } catch (e) {
    throw new Error(e as string);
  }
};


export { allUsers, getUserServ, allUserRolServ, updateUserServ, deleteUserServ };
