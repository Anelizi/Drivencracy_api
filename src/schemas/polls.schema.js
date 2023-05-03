import Joi from "joi";
import BaseJoi from "joi";
import JoiDate from "@joi/date";

const joi = BaseJoi.extend(JoiDate);

export const pollSchema = Joi.object({
  title: Joi.string().min(3).required(),
  expireAt: joi.date().format("YYYY-MM-DD HH:mm:ss").allow("").required(),
});
