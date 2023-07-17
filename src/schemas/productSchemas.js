import Joi from "joi";

export const schemaCarrinho = Joi.object({
    idProduct: Joi.required()
})

export const schemaSearch = Joi.object({
    world: Joi.required()
})