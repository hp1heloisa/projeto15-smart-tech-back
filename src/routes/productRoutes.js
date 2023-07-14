import { Router } from "express";
import { postProduct } from "../controllers/product.controller.js";

const productsRouter = Router();

productsRouter.post('/produtos', postProduct);

export default productsRouter;