import { compare } from "bcryptjs";
import AppDataSource from "../data-source";
import { Users } from "../entities/userEntities";
import { AppError } from "../error/appError";
import { IUserLogin } from "../interfaces/users";
import jwt from "jsonwebtoken";

export const loginService = async ({ email, password }: IUserLogin) => {
  const userRepo = AppDataSource.getRepository(Users);
  const users = await userRepo.findOneBy({ email: email });
  if (!users) {
    throw new AppError("Email incorreto", 403);
  }
  const passwd = await compare(password, users.password);
  if (!passwd) {
    throw new AppError("Senha incorreta", 403);
  }

  if (!users.isActive) {
    throw new AppError("Usuário não está ativo", 403);
  }

  const token = jwt.sign(
    {
      isAdm: users.isAdm,
      isActive: users.isActive,
      id: users.id,
    },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );
  return { token };
};
