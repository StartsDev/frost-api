import db from "../models";
import { IdentificationAttributes } from "../interfaces/identification.interface";

const createIdentServ = async (ident: IdentificationAttributes) => {
    try {
      const findIdent = await db.Identification.findOne({ where: { name: ident.name } });
      if (findIdent) {
        return {
          msg: "This identification type already exists",
        };
      }
      const newIdent = await db.Identification.create(ident);
      if (newIdent === null) {
        return {
          msg: "Failed to register identification type",
        };
      }
      return {
        msg: "Identification type created successfully...",
        data: newIdent,
      };
    } catch (e) {
      throw new Error(e as string);
    }
  };
  
  const getIdentServ = async () => {
      try{
          const identifications = await db.Identification.findAll();
          return {
              data: identifications
            };
      }catch(e){
        throw new Error(e as string);
      }
  }
  
  
  export { createIdentServ, getIdentServ };
  