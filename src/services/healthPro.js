const bcrypt = require("bcrypt");
const { checking_email_exist } = require("../DAL/user");
const { signup_user } = require("../DAL/user");
const { professional_signup } = require("../DAL/healthPro");

const signupProfessional = async (body, resp) => {
  const checkingemailexist = await checking_email_exist(body.email);

  console.log({ checkingemailexist });

  if (checkingemailexist !== null) {
    resp.error = true;
    resp.error_message = "Email already exist";
    return resp;
  }

  if (body.password !== body.confirm_password) {
    resp.error = true;
    resp.error_message = "Passwords do not match";
    return resp;
  }

  body.role = "professional";
  body.password = await bcrypt.hash(body.password, 10);

  delete body.confirm_password;

  // signup new user
  let user = await signup_user(body);
  if (!user) {
    resp.error = true;
    resp.error_message = "Signup failed";
    return resp;
  }

  body.user_id = user._id;
  const professional = await professional_signup(body);

  if (!professional) {
    resp.error = true;
    resp.error_message = "Error in creating professional!";
    return resp;
  }

  let data = {
    user_id: user._id,
    email: user.email,
    role: user.role,
    first_name: professional.first_name,
    speciality: professional.speciality,
    practice: professional.practice,
    phone_number: professional.phone_number,
    description: professional.description,
    language: professional.language,
    education: professional.education,
    experience: professional.experience,
    hospital_affiliation: professional.hospital_affiliation,
  };
  resp.data = data;
  return resp;
};

module.exports = {
  signupProfessional,
};
