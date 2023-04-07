import {
  usersDeleteService,
  usersGetService,
  usersPatchService,
  usersPostService,
} from "../services/users.services";
import { Request, Response } from "express";

export const usersPostController = async (req: Request, res: Response) => {
  const user = await usersPostService(req.body);
  return res.status(201).json(user);
};

export const usersGetController = async (req: Request, res: Response) => {
  const user = await usersGetService();
  return res.status(201).json(user);
};

export const usersDeleteController = async (req: Request, res: Response) => {
  await usersDeleteService(req.params.id);
  return res.sendStatus(204);
};

export const usersPatchController = async (req: Request, res: Response) => {
  const user = await usersPatchService(
    req.body,
    req.params.id,
    req.headers.authorization
  );
  return res.status(200).json(user);
};
