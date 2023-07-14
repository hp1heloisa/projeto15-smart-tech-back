import { Router } from "express";
import productsRouter from "./productRoutes.js";
import userRouter from "./userRoutes.js";

const router = Router();

router.use(userRouter);
router.use(productsRouter);

export default router;