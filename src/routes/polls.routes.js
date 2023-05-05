import { Router } from "express";
import { pollChoiceGet, pollGet, pollPost, pollResultGet } from "../controllers/polls.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { pollSchema } from "../schemas/polls.schema.js";

const pollsRouter = Router();

pollsRouter.post("/poll", validateSchema(pollSchema), pollPost);
pollsRouter.get("/poll", pollGet);
pollsRouter.get("/poll/:id/choice", pollChoiceGet);
pollsRouter.get("/poll/:id/result", pollResultGet);

export default pollsRouter;
