import { Router } from "express";
import { choicePost, choiceVotePost } from "../controllers/choice.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { choiceSchema } from "../schemas/choice.schema.js";

const choiceRouter = Router();

choiceRouter.post("/choice", validateSchema(choiceSchema), choicePost);
choiceRouter.post("/choice/:id/vote", choiceVotePost);

export default choiceRouter;