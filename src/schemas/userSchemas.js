import Joi from "joi";

export const schemaCadastro = Joi.object({
    name: Joi.string().required(),
    email: Joi.email().required(),
    password: Joi.min(3).string().required(),
    adress: Joi.string().required()
});

export const schemaLogin = Joi.object({
    email: Joi.email().required(),
    password: Joi.min(3).string().required()
});