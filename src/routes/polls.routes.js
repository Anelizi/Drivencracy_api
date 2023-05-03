import { Router } from "express";
import { pollGet, pollPost } from "../controllers/polls.controllers.js";
import { validateSchema } from "../middlewares/validateSchemaPoll.js";
import { pollSchema } from "../schemas/polls.schema.js";

const pollsRouter = Router();

pollsRouter.post("/poll", validateSchema(pollSchema), pollPost);
pollsRouter.get("/poll", pollGet);
pollsRouter.get("/poll/:id/choice");
pollsRouter.get("/poll/:id/result");

export default pollsRouter;
