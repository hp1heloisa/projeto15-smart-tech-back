import { Router } from "express";
import { getProductById, getProducts, postProduct } from "../controllers/product.controller.js";

const productsRouter = Router();

productsRouter.post('/produtos', postProduct);
productsRouter.get('/', getProducts);
productsRouter.get('/produtos/:id', getProductById);

export default productsRouter;