const Joi = require("joi");

exports.createQuiz = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(150).trim().required(),
    description: Joi.string().max(250).trim(),
    scheduledOn: Joi.date().required(),
    noOfQuestions: Joi.number().min(1).required(),
    duration: Joi.number().required(),
    haveSubs: Joi.boolean().required(),
    subs: Joi.when("haveSubs", {
      is: true,
      then: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().trim().required(),
            number: Joi.number().min(1).required(),
          })
        )
        .required(),
    }),
  });

  return schema.validate(body);
};

exports.editQuiz = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(150).trim().required(),
    description: Joi.string().max(250).trim(),
    scheduledOn: Joi.date().required(),
    noOfQuestions: Joi.number().min(1).required(),
    duration: Joi.number().required(),
    haveSubs: Joi.boolean().required(),
    subs: Joi.when("haveSubs", {
      is: true,
      then: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().trim().required(),
            number: Joi.number().min(1).required(),
          })
        )
        .required(),
    }),
    active: Joi.bool().required(),
    completed: Joi.bool().required(),
  });

  return schema.validate(body);
};
