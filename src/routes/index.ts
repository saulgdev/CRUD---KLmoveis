import { Router } from "express";
import { loginController } from "../controllers/login.controllers";
import {
  usersDeleteController,
  usersGetController,
  usersPatchController,
  usersPostController,
} from "../controllers/users.controllers";
import {
  verifyAdm,
  verifyAuth,
  verifyExistsUser,
} from "../middlewares/verifyUsers";
export const usersRouter = Router();

usersRouter.post("/login", loginController);
usersRouter.post("/users", verifyExistsUser, usersPostController);
usersRouter.get("/users", verifyAuth, verifyAdm, usersGetController);
usersRouter.patch("/users/:id", verifyAuth, usersPatchController);
usersRouter.delete("/users/:id", verifyAuth, verifyAdm, usersDeleteController);
