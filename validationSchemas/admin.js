const Joi = require("joi");

exports.createAdmin = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(250).trim().required(),
    email: Joi.string().email().required(),
    phoneNo: Joi.string()
      .length(10)
      .trim()
      .pattern(/[6-9]{1}[0-9]{9}/)
      .required(),
    password: Joi.string().min(5).max(100).trim().required(),
    confirmPassword: Joi.string().min(5).max(100).trim().required(),
  });

  return schema.validate(body);
};

exports.editAdmin = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(250).trim().required(),
    email: Joi.string().email().required(),
    phoneNo: Joi.string().length(10).trim().required(),
  });

  return schema.validate(body);
};

exports.changePassword = (body) => {
  const schema = Joi.object({
    oldPassword: Joi.string().min(5).max(100).trim().required(),
    password: Joi.string().min(5).max(100).trim().required(),
    confirmPassword: Joi.string().min(5).max(100).trim().required(),
  });

  return schema.validate(body);
};

exports.changeAccess = (body) => {
  const schema = Joi.object({
    access: Joi.boolean().required(),
  });

  return schema.validate(body);
};
