const Joi = require("joi");

const validateCustomer = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirm_password: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  gender: Joi.string().required(),
  dob: Joi.date().required(),
});

module.exports = { validateCustomer };
