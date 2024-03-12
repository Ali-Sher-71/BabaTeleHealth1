const bcrypt = require("bcrypt");
const { checking_email_exist } = require("../DAL/user");
const { signup_user } = require("../DAL/user");
const { provider_signup } = require("../DAL/provider");

const signupProvider = async (body, resp) => {
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

  body.role = "provider";
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
  const provider = await provider_signup(body);

  if (!provider) {
    resp.error = true;
    resp.error_message = "Error in creating provider!";
    return resp;
  }

  let data = {
    user_id: user._id,
    email: user.email,
    first_name: provider.first_name,
    role: user.role,
    practice: provider.practice,
    language: provider.language,
    city: provider.city,
    region: provider.region,
    education: provider.education,
    speciality: provider.speciality,
    experience: provider.experience,
    description: provider.description,
    phone_number: provider.phone_number,
    hospital_affiliation: provider.hospital_affiliation,
  };
  resp.data = data;
  return resp;
};

module.exports = {
  signupProvider,
};
