const Joi = require("joi");

exports.createQuiz = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(150).trim().required(),
    description: Joi.string().max(250),
    scheduledOn: Joi.date().required(),
  });

  return schema.validate(body);
};

exports.editQuiz = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(150).trim().required(),
    description: Joi.string().max(250),
    scheduledOn: Joi.date().required(),
    active: Joi.bool().required(),
    completed: Joi.bool().required(),
  });

  return schema.validate(body);
};
