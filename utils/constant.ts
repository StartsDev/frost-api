interface MESSAGE_AUTH {
  userCreated: string
  userPreviousRegistered: string
  userModified: string
  emailExist: string
  idNotExist: string
  roleNotExist: string
  userNotFound: string
  passwordNotAsigned: string
  incorrectPassword: string
  userLogued: string
  creationError: string
}

const MESSAGE_AUTH: MESSAGE_AUTH = {
  userCreated: "Usuario creado satisfactoriamente. Por favor verificar su correo",
  userPreviousRegistered: "Este usuario ya esta registrado",
  userModified: "Usuario verificar",
  emailExist: "Ya existe un susuario registrado con este email.",
  idNotExist: "Tipo de identificación no existe",
  roleNotExist: "Tipo de rol no existe",
  userNotFound: "Usuario no encontrado",
  passwordNotAsigned: "El password no ha sido asignado a este usuario",
  incorrectPassword: "Clave incorrecta",
  userLogued: "Usuario logueado satisfactoriamente",
  creationError: 'hubo un error en la creacion'

}

module.exports = {MESSAGE_AUTH}