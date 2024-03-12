const Joi = require("joi");

const validateProfessional = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirm_password: Joi.string().required(),
  first_name: Joi.string().required(),
  phone_number: Joi.string().required(),
  speciality: Joi.string().required(),
  practice: Joi.string().required(),
  language: Joi.string().required(),
  description: Joi.string().required(),
  education: Joi.string().required(),
  experience: Joi.string().required(),
  hospital_affiliation: Joi.string().required(),
});

module.exports = { validateProfessional };
