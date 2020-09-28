const Joi = require("joi");
const branches = [
  "CHEMICAL ENGINEERING – CHE",
  "CIVIL ENGINEERING - CIE",
  "COMPUTER ENGINEERING - COE",
  "COMPUTER SCIENCE AND ENGINEERING(PATIALA CAMPUS) – COPC",
  "ELECTRICAL ENGINEERING - ELE",
  "ELECTRONICS AND COMMUNICATION ENGINEERING - ECE",
  "ELECTRONICS AND COMPUTER ENGINEERING - ENC",
  "ELECTRONICS (INSTRUMENTATION AND CONTROL) ENGINEERING - EIC",
  "MECHANICAL ENGINEERING – MEE",
  "MECHANICAL ENGINEERING(PRODUCTION) - MPE",
  "MECHATRONICS - MEC",
  "ELECTRICAL AND COMPUTER ENGINEERING - MEC",
];
exports.register = (body) => {
  const schema = Joi.object({
    // year:Joi.string()
    phoneNo: Joi.string()
      .length(10)
      .trim()
      .pattern(/[6-9]{1}[0-9]{9}/)
      .required(),
    branch: Joi.string()
      .valid(...branches)
      .min(3)
      .max(250)
      .trim(), //! Make required()
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
