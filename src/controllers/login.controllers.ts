import { loginService } from "../services/login.services";
import { Request, Response } from "express";

export const loginController = async (req: Request, res: Response) => {
  const token = await loginService(req.body);
  return res.status(200).json(token);
};
