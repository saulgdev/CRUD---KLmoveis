import AppDataSource from "../data-source";
import { IUserRequest } from "../interfaces/users";
import { Users } from "../entities/userEntities";
import { hash } from "bcryptjs";
import { AppError } from "../error/appError";
import { decode, JwtPayload } from "jsonwebtoken";

const userRepo = AppDataSource.getRepository(Users);

export const usersPostService = async (
  payload: IUserRequest
): Promise<Users> => {
  const password = await hash(payload.password, 10);
  const user = userRepo.create({ ...payload, password });
  await userRepo.save(user);

  return { ...user, password: undefined };
};

export const usersGetService = async (): Promise<Users[]> => {
  return await userRepo.find({
    select: [
      "name",
      "email",
      "createdAt",
      "id",
      "isActive",
      "isAdm",
      "updatedAt",
    ],
  });
};

export const usersDeleteService = async (payload) => {
  const user = await userRepo.findOneBy({ id: payload });

  if (!user) {
    throw new AppError("Id Invalido", 404);
  }

  if (!user.isActive) {
    throw new AppError("Usuário não está ativo", 400);
  }

  await userRepo.update(payload, { isActive: false });
};

export const usersPatchService = async (payload, id, token) => {
  const user = await userRepo.findOneBy({ id: id });

  const auth = token;
  const t = auth.split(" ")[1];
  const isAdm = decode(t) as JwtPayload;

  if (!user) {
    throw new AppError("Id Invalido", 404);
  }

  if ("isAdm" in payload || "id" in payload || "isActive" in payload) {
    throw new AppError("Não pode atualizar este campo", 401);
  }

  if (isAdm.isAdm) {
    await userRepo.update(user.id, { ...payload });
  }

  if (!isAdm.isAdm && isAdm.id === id) {
    await userRepo.update(user.id, { ...payload });
  }
};
