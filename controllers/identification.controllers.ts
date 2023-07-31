import { Request, Response } from "express";
import { createIdentServ, getIdentServ } from "../services/identification.services";

//Register new identification
const createIdentification = async (req: Request, res: Response) => {
    try {
       const identification = await createIdentServ(req.body);
       res.status(200).json(identification);
    } catch (e) {
      console.log(e);
    }
  };
  
  // Get all identifications
  const getIdentifications = async (req: Request, res: Response) => {
    try{
      const identifications = await getIdentServ();
      res.status(200).json(identifications);
    }catch(e){
      console.log(e);
    }
  }
  
  export { createIdentification, getIdentifications };

