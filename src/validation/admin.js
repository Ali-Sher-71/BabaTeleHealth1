const Joi = require("joi");

const validateAdmin = Joi.object({
  username: Joi.string().min(3).max(20).required().trim(),
  email: Joi.string().required().trim(),
  password: Joi.string().min(5).max(255).required().trim(),
  phone_number: Joi.string().trim().allow("", null),
});

module.exports = { validateAdmin };
