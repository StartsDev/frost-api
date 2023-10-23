import { Response } from "express";
import { uploadAvatarServ } from "../services/avatar.service";


const upImgAvatar = async (req: any, res: Response) => {
  try {
    const { tempFilePath } = req.files.data;
    const url = await uploadAvatarServ(tempFilePath, req.params.id);
    res.json({ url });
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
}

export { upImgAvatar };
