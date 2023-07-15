import { Router } from "express";
import { addProduto, getProductByCategory, getProductById, getProducts, postProduct, postProductMany } from "../controllers/product.controller.js";
import { validateAuth } from "../middlewares/validateAuthorization.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { schemaCarrinho } from "../schemas/productSchemas.js";

const productsRouter = Router();

productsRouter.post('/produtos', postProduct);
productsRouter.get('/', getProducts);
productsRouter.get('/produtos/:id', getProductById);
productsRouter.get('/category/:category', getProductByCategory);
productsRouter.post('/many', postProductMany);
productsRouter.put('/addproduto', validateAuth, validateSchema(schemaCarrinho), addProduto)

export default productsRouter;