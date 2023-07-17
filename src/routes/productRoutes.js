import { Router } from "express";
import { addCarrinho, deleteProdutos, getCarrinho, getProductByCategory, getProductById, getProducts, limpaCarrinho, postProduct, postProductMany, searchProduct, sendOrder } from "../controllers/product.controller.js";
import { validateAuth } from "../middlewares/validateAuthorization.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { schemaCarrinho } from "../schemas/productSchemas.js";

const productsRouter = Router();

productsRouter.post('/produtos', postProduct);
productsRouter.get('/', getProducts);
productsRouter.get('/produtos/:id', getProductById);
productsRouter.get('/category/:category', getProductByCategory);
productsRouter.post('/many', postProductMany);
productsRouter.put('/addproduto', validateAuth, validateSchema(schemaCarrinho), addCarrinho);
productsRouter.get('/search', searchProduct);
productsRouter.get('/carrinho', validateAuth, getCarrinho);
productsRouter.put('/carrinho/limpa', validateAuth, limpaCarrinho);
productsRouter.post('/pagamento', validateAuth, sendOrder);
productsRouter.put('/carrinho/:id', validateAuth, deleteProdutos);

export default productsRouter;