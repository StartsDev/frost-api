import bcrypt from "bcrypt";
const jwt = require('jsonwebtoken');
const Password = require("../models/password");
const User = require("../models/user");
const Identification = require("../models/identification");
const path = require('path');
const hbs = require('nodemailer-express-handlebars');
const transporter = require('../mailer/mailer');
require('dotenv').config();

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

const forgotPasswordsServ = async (email:any, res:any) => {

  if (!email) {
      return {
          message: res.status(400).send({ msg: "Email incorrecto" })
      }
  }
  

  let verificationLink;
  let emailStatus = 'Ok';
  let user;

  try {
      user = await User.findOne({ email })
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET_RESET, {
          expiresIn: '1h'
      })
      verificationLink = `${process.env.FRONTEND_URL_LOCAL}/auth/new-password/${token}`;
      user.resetToken = token;
      user.save();
  } catch (error) {
      return {
          message:"User not found",
      }
  }

  try {
      // send mail with defined transport object
      
      // Handlebars templates
      const handlebarOptions = {
          viewEngine: {
              extName: ".handlebars",
              partialsDir: path.resolve('./views'),
              defaultLayout: false,
          },
          viewPath: path.resolve('./views'),
          extName: ".handlebars",
      }

      transporter.use('compile', hbs(handlebarOptions))

      await transporter.sendMail({
          from: `'"Admon Aires 👻" <${process.env.EMAIL_ACCOUNT}>'`, // sender address
          to: user.email, // list of receivers
          subject: "Notificación cambio de contraseña ✔", // Subject line
          /*  html: `<b>Por favor da click en este enlace o pegalo en tu navegador para completar el proceso:</b>
           <a href="${verificationLink}">${verificationLink}</a>`, // html body */
          template: 'email',
          context: {
              title: 'Notificación cambio de contraseña',
              text: 'Por favor da click en este enlace o pegalo en tu navegador para completar el proceso:',
              verificationLink: verificationLink,
              textFoot:'Por favor comunicarse con soporte de Aires si tiene algun problema'
          }
      });
  } catch (error) {
      return {
          message: "El email no pudo ser enviado",
      }
  }
  return {
      status: emailStatus,
      message: "Verifica tu correo para un link de reseteo de tu password"
  }
}

const createNewPasswords = async (data:any, res:any) => {
  const { newPassword } = data.body
  const resetToken = data.headers['reset']
  if (!resetToken && newPassword) {
      return {
          status: res.status(400),
          message: "Todos los campos son requeridos"
      }
  }

  // Password validation
  if (newPassword.length < 8) {
      return {
          status: res.status(400),
          msg: "Por favor ingresa un password de maximo 8 carateres",
      };
  }

  let user;
  let jwtPayload;
  let pwdEncrypt;

  try {
      jwtPayload = jwt.verify(resetToken, process.env.JWT_SECRET_RESET);
      user = await User.findOne({ email: jwtPayload.email });
  } catch (error) {
      return {
          status: res.status(400),
          message: error
      }
  }

  pwdEncrypt = bcrypt.hashSync(newPassword, 10);
  user.password = pwdEncrypt;

  try {
      await user.save();
  } catch (error) {
      return {
          message: error
      }
  }

  return {
      message: "Su password se ha cambiado correctamente"
  }

}

export { createPwdServ, forgotPasswordsServ, createNewPasswords };
