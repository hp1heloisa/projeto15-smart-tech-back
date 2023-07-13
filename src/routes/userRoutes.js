import { Router } from "express";
import { cadastro, login } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { schemaCadastro, schemaLogin } from "../schemas/userSchemas.js";

const userRouter = Router();

userRouter.post('/cadastro', validateSchema(schemaCadastro), cadastro);
userRouter.post('/login', validateSchema(schemaLogin), login);

export default userRouter;