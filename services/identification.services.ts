const Identification = require("../models/identification");
import { IdentificationAttributes } from "../interfaces/identification.interface";

// Create identification
const createIdentServ = async (ident: IdentificationAttributes) => {
  try {
    const findIdent = await Identification.findOne({
      where: { name: ident.name },
    });
    if (findIdent) {
      return {
        msg: "Este tipo de identificación ya está registrada...",
        success: false,
      };
    }
    const newIdent = await Identification.create(ident);
    if (!newIdent) {
      return {
        msg: "Error al registrar el tipo de identifiación...",
        success: false,
      };
    }
    return {
      msg: "Identificación registrada satisfactoriamente...",
      newIdent,
      success: true,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

// Get all identifications
const getIdentServ = async () => {
  try {
    const identifications = await Identification.findAll();
    return {
      identifications,
      success: true,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

//Update identification
const updateIdentServ = async (id: any, cli: any) => {
  try {
    const identFound = await Identification.findOne({ where: { id } });

    if (!identFound) {
      return {
        msg: "Identificación no encontrada",
        success: false,
      };
    }
    const [updateIdent] = await Identification.update(cli, {
      where: {
        id,
      },
      returning: true,
    });
    if (updateIdent <= 0) {
      return {
        msg: "Actualización no realizada...",
        success: false,
      };
    }
    const ident = await Identification.findOne({ where: { id } });
    return {
      msg: "Identificación actualizada satisfactoriamente...",
      ident,
      success: true,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

//Delete identification
const deleteIdentServ = async (ident: any) => {
  try {
    const identification = await Identification.destroy({
      where: {
        id: ident,
      },
    });
    if (!identification) {
      return {
        msg: "El tipo de identificación no esta registrado...",
        success: false,
      };
    }
    return {
      msg: "Identificación eliminada...",
      success: true,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

export { createIdentServ, getIdentServ, updateIdentServ, deleteIdentServ };
