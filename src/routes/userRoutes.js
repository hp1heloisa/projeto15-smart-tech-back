import { Router } from "express";
import { cadastro, login, logout } from "../controllers/auth.controller.js";
import { validateAuth } from "../middlewares/validateAuthorization.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { schemaCadastro, schemaLogin } from "../schemas/userSchemas.js";

const userRouter = Router();

userRouter.post('/cadastro', validateSchema(schemaCadastro), cadastro);
userRouter.post('/login', validateSchema(schemaLogin), login);
userRouter.delete('/logout', validateAuth, logout);

export default userRouter;