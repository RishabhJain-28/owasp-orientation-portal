const Joi = require("joi");

exports.createQuestion = (body) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(500).trim().required(),
    statement: Joi.string().min(5).max(1500).trim().required(),
    type: Joi.string().valid("mcq", "input").trim().lowercase().required(),
    options: Joi.when("type", {
      is: "mcq",
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
    // ! Also include ref to pool when pool is ready
  });

  return schema.validate(body);
};

exports.editQuestion = (body) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(500).trim().required(),
    statement: Joi.string().min(5).max(1500).trim().required(),
    type: Joi.string().valid("mcq", "input").trim().lowercase().required(),
    options: Joi.when("type", {
      is: "mcq",
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
    // ! Also include ref to pool when pool is ready
  });

  exports.changeAnswer = (body) => {
    const schema = Joi.object({
      answer: Joi.string().min(1).max(500).trim().required(),
    });

    return schema.validate(body);
  };

  return schema.validate(body);
};
