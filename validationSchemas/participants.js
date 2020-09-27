const Joi = require("joi");

exports.register = (body) => {
  const schema = Joi.object({
    phoneNo: Joi.string()
      .length(10)
      .trim()
      .pattern(/[6-9]{1}[0-9]{9}/)
      .required(),
    branch: Joi.string().min(5).max(250).trim(), //! Make required()
    //? cheeck for validity of branches
  });

  return schema.validate(body);
};

exports.edit = (body) => {
  const schema = Joi.object({
    phoneNo: Joi.string()
      .length(10)
      .trim()
      .pattern(/[6-9]{1}[0-9]{9}/)
      .required(),
  });

  return schema.validate(body);
};
