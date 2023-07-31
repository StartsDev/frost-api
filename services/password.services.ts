import bcrypt from "bcrypt";
import db from "../models";
const saltRounds = 10; // Number of salt rounds for bcrypt

const createPwdServ = async (pwd: any) => {
  try {
    //console.log(pwd)
     const findUser = await db.User.findOne({ where: { id: pwd.userId } });
    if (!findUser) {
      return {
        msg: "This user has not registered before",
      };
    }
    console.log(findUser)
    console.log(pwd.userId)
 
    const findPasword = await db.Password.findOne({ where: { userId: pwd.userId } });
    
    if (findPasword) {
      return {
        msg: "This user has a password asigned currently",
      };
    }
  
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(pwd.password, salt);

    const newPassword = await db.Password.create({
      password: hashedPassword,
      userId: pwd.userId,
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
