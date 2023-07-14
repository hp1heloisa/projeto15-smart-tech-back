import { Router } from "express";
import { getProductByCategory, getProductById, getProducts, postProduct } from "../controllers/product.controller.js";

const productsRouter = Router();

productsRouter.post('/produtos', postProduct);
productsRouter.get('/', getProducts);
productsRouter.get('/produtos/:id', getProductById);
productsRouter.get('/category/:category', getProductByCategory);

export default productsRouter;