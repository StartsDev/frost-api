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
        msg: "Usuario desconocido...",
        success: false
      };
    }
    if(!findIdent){
      return {
        msg: "Tipo de identificación desconocida...",
        succes: false
      };
    }
    const findPasword = await Password.findOne({
      where: { userId: findUser.id },
    });

    if (findPasword) {
      return {
        msg: "Este usuario tiene un password asignado",
        success: false
      };
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(pwd.password, salt);

    const newPassword = await Password.create({
      password: hashedPassword,
      userId: findUser.id,
    });
    if (!newPassword) {
      return {
        msg: "Error al registrar el password",
        success: false
      };
    }
    return {
      msg: "Clave asignada satisfactoriamente...",
      success: true
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

export { createPwdServ };
