import { Router } from "express";
import { getProductByCategory, getProductById, getProducts, postProduct, postProductMany } from "../controllers/product.controller.js";

const productsRouter = Router();

productsRouter.post('/produtos', postProduct);
productsRouter.get('/', getProducts);
productsRouter.get('/produtos/:id', getProductById);
productsRouter.get('/category/:category', getProductByCategory);

productsRouter.post('/many', postProductMany);

export default productsRouter;