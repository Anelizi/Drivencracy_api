import Joi from "joi";

export const choiceSchema = Joi.object({
  title: Joi.string().min(1).required(),
  pollId: Joi.string().required(),
});
