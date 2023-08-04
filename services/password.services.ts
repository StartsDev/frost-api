import bcrypt from "bcrypt";
const Password = require("../models/password");
const User = require("../models/user");
const Identification = require("../models/identification");

const saltRounds = 10; // Number of salt rounds for bcrypt

const createPwdServ = async (pwd: any) => {
  try {
    const findUser = await User.findOne({
      where: { numIdent: pwd.numIdent },
    });
    const findIdent = await Identification.findOne({
      where: { id: pwd.identId },
    });
    if (!findUser) {
      return {
        msg: "User is unknown...",
      };
    }
    if(!findIdent){
      return {
        msg: "Identification type is unknown...",
      };
    }
    const findPasword = await Password.findOne({
      where: { userId: findUser.id },
    });

    if (findPasword) {
      return {
        msg: "This user has a password asigned currently",
      };
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(pwd.password, salt);

    const newPassword = await Password.create({
      password: hashedPassword,
      userId: findUser.id,
    });
    if (newPassword === null) {
      return {
        msg: "Failed to register password",
      };
    }
    return {
      msg: "Password asigned successfully...",
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

export { createPwdServ };
