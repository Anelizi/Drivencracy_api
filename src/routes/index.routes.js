import { Router } from "express";
import choiceRouter from "./choice.routes.js";
import pollsRouter from "./polls.routes.js";

const router = Router();

router.use(pollsRouter);
router.use(choiceRouter);

export default router;
