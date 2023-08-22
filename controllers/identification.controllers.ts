import { Request, Response } from "express";
import {
  createIdentServ,
  getIdentServ,
  updateIdentServ,
  deleteIdentServ,
} from "../services/identification.services";

//Register new identification
const createIdentification = async (req: Request, res: Response) => {
  try {
    const identification = await createIdentServ(req.body);
    res.status(200).json(identification);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

// Get all identifications
const getIdentifications = async (req: Request, res: Response) => {
  try {
    const identifications = await getIdentServ();
    res.status(200).json(identifications);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

//Update identification
const updateIdentification = async (req: Request, res: Response) => {
  try {
    const identification = await updateIdentServ(req.params.id, req.body);
    res.status(200).json(identification);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

// Delete identification
const deleteIdentification = async (req: Request, res: Response) => {
  try {
    const identifications = await deleteIdentServ(req.params.id);
    res.status(200).json(identifications);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

export {
  createIdentification,
  getIdentifications,
  updateIdentification,
  deleteIdentification,
};
