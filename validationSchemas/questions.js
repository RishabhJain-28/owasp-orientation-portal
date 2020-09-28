const Joi = require("joi");

exports.createQuestion = (body) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(500).trim().required(),
    statement: Joi.string().min(5).max(1500).trim().required(),
    type: Joi.string().valid("MCQ", "INPUT").trim().uppercase().required(),
    options: Joi.when("type", {
      is: "MCQ",
      then: Joi.array()
        .length(4)
        .items(
          Joi.string().trim().required(),
          Joi.string().trim().required(),
          Joi.string().trim().required(),
          Joi.string().trim().required()
        )
        .required(),
    }),
    answer: Joi.string().min(1).max(500).trim().required(),
    points: Joi.number().integer().greater(0).required(),
    quiz: Joi.string().required(),
    sub: Joi.string().max(25).trim(),
  });

  return schema.validate(body);
};

exports.editQuestion = (body) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(500).trim().required(),
    statement: Joi.string().min(5).max(1500).trim().required(),
    type: Joi.string().valid("MCQ", "INPUT").trim().uppercase().required(),
    options: Joi.when("type", {
      is: "MCQ",
      then: Joi.array()
        .length(4)
        .items(
          Joi.string().trim().required(),
          Joi.string().trim().required(),
          Joi.string().trim().required(),
          Joi.string().trim().required()
        )
        .required(),
    }),
    points: Joi.number().integer().greater(0).required(),
    quiz: Joi.string().required(),
    sub: Joi.string().max(25).trim(),
  });

  return schema.validate(body);
};

exports.changeAnswer = (body) => {
  const schema = Joi.object({
    answer: Joi.string().min(1).max(500).trim().required(),
  });

  return schema.validate(body);
};
