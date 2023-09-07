import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const Password = require("../models/password");
const User = require("../models/user");
const Identification = require("../models/identification");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");
const transporter = require("../mailer/mailer");
require("dotenv").config();

const saltRounds = 10; // Number of salt rounds for bcrypt

// Create neww password
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
        success: false,
      };
    }
    if (!findIdent) {
      return {
        msg: "Tipo de identificación desconocida...",
        succes: false,
      };
    }
    const findPasword = await Password.findOne({
      where: { userId: findUser.id },
    });

    if (findPasword) {
      return {
        msg: "Este usuario tiene un password asignado",
        success: false,
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
        success: false,
      };
    }
    return {
      msg: "Clave asignada satisfactoriamente...",
      success: true,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

// Forgot password
const forgotPasswordsServ = async (email: any) => {
  try {
    const uuid = uuidv4();
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return {
        msg: "Usuario no encontrado...",
        success: false,
      };
    }
    const plainUser = user.get({ plain: true });
    const token = jwt.sign(
      {
        id: plainUser.id,
        firstName: plainUser.firstName,
        lastName: plainUser.lastName,
        numIdent: plainUser.numIdent,
        email: plainUser.email,
      },
      process.env.JWT_SECRET_RESET,
      {
        expiresIn: "30m",
      }
    );
    const URL =
      process.env.FRONTEND_URL_DEPLOYED || process.env.FRONTEND_URL_LOCAL;
    const verificationLink = `${URL}/password/new-password/${uuid}`;
    const updateUser = await User.update(
      { resetToken: token },
      {
        where: {
          numIdent: plainUser.numIdent,
        },
        returning: true,
      }
    );
    if (updateUser <= 0) {
      return {
        msg: "Actualización  de token no realizado...",
        success: false,
      };
    }

    const updUser = await User.findOne({
      where: {
        email,
      },
    });

    const user_ = updUser.get({ plain: true });

    // send mail with defined transport object

    // Handlebars templates
    const handlebarOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve("./views"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./views"),
      extName: ".handlebars",
    };

    transporter.use("compile", hbs(handlebarOptions));

    const notification = await transporter.sendMail({
      from: `'"Admon Aires S.A.S 👻" <${process.env.EMAIL_ACCOUNT}>'`, // sender address
      to: plainUser.email, // list of receivers
      subject: "Notificación cambio de contraseña usuarios Aires S.A.S ✔", // Subject line
      /*  html: `<b>Por favor da click en este enlace o pegalo en tu navegador para completar el proceso:</b>
           <a href="${verificationLink}">${verificationLink}</a>`, // html body */
      template: "email",
      context: {
        title: "Notificación cambio de contraseña",
        text: "Por favor da click en este enlace o pegalo en tu navegador para completar el proceso:",
        verificationLink: verificationLink,
        textFoot:
          "Por favor comunicarse con soporte de Aires S.A.S si tiene algun problema...",
      },
    });
    if (!notification) {
      return {
        msg: "La notificación no pudo ser enviada...",
        success: false,
      };
    }
    return {
      message: "Verifica tu correo para un link de reseteo de tu password...",
      success: true,
      resetToken: user_.resetToken,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

// Verify reset password
const verifyResetToken = async (token: any) => {
  try {
    // Verificamos el reset token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_RESET);
    if (!decoded) {
      return {
        msg: "El token no es válido o ha caducado...",
        success: false,
      };
    }
    return {
      message: "Token válido. Puedes restablecer tu contraseña...",
      success: true,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

// Update password
const createNewPasswordServ = async (resetToken: any, newPassword: any) => {
  let jwtPayload;
  if (!resetToken && newPassword) {
    return {
      message: "Todos los campos son requeridos o token no válido...",
      success: false,
    };
  }
  try {
    // Password validation
    if (newPassword.length < 8) {
      return {
        msg: "Por favor ingresa un password de maximo 8 carateres...",
        success: false,
      };
    }

    jwtPayload = jwt.verify(resetToken, process.env.JWT_SECRET_RESET);
    const user = await User.findOne({
      where: {
        numIdent: jwtPayload.numIdent,
      },
    });
    if (!user) {
      return {
        msg: "Usuario no encontrado...",
        success: false,
      };
    }
    // Delete dataValues in User object
    const plainUser = user.get({ plain: true });

    const pwdEncrypt = bcrypt.hashSync(newPassword, 10);

    const updatePassword = await Password.update(
      { password: pwdEncrypt },
      {
        where: {
          userId: plainUser.id,
        },
        returning: true,
      }
    );
    if (updatePassword <= 0) {
      return {
        msg: "Actualización  de password no realizado...",
        success: false,
      };
    }
    const updateUser = await User.update(
      { resetToken: null },
      {
        where: {
          id: plainUser.id,
        },
        returning: true,
      }
    );
    if (updateUser <= 0) {
      return {
        msg: "Actualización  del reset_token no realizado...",
        success: false,
      };
    }
    return {
      message: "Su password se ha cambiado correctamente...",
      success: true,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

export {
  createPwdServ,
  forgotPasswordsServ,
  verifyResetToken,
  createNewPasswordServ,
};
