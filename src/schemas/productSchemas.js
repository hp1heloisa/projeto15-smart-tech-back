import Joi from "joi";

export const schemaCarrinho = Joi.object({
    idProduct: Joi.required()
})
