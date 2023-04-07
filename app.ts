import "express-async-errors";
import "reflect-metadata";
import express from "express";
import { usersRouter } from "./routes";
import { handler } from "./error/handler";

const app = express();
app.use(express.json());

app.use(usersRouter);
app.use(handler);

export default app;
