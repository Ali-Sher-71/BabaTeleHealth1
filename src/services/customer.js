const bcrypt = require("bcrypt");
const { checking_email_exist } = require("../DAL/user");
const { signup_user } = require("../DAL/user");
const { customer_signup } = require("../DAL/customer");

const signupCustomer = async (body, resp) => {
  console.log("AHSANNNNNNN");
  const checkingemailexist = await checking_email_exist(body.email);

  // console.log({ "Email being": checkingemailexist });

  if (checkingemailexist !== null) {
    resp.error = true;
    resp.error_message = "Email already exists";
    return resp;
  }

  if (body.password !== body.confirm_password) {
    resp.error = true;
    resp.error_message = "Passwords do not match";
    return resp;
  }

  body.role = "customer";
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
  const customer = await customer_signup(body);

  if (!customer) {
    resp.error = true;
    resp.error_message = "Error in creating customer!";
    return resp;
  }

  let data = {
    user_id: user._id,
    email: user.email,
    role: user.role,
    first_name: customer.first_name,
    last_name: customer.last_name,
    // phone_number: customer.phone_number,
    gender: customer.gender,
    dob: customer.dob,
  };
  resp.data = data;
  console.log(resp.data, "RESPONSE");
  return resp;
};
module.exports = {
  signupCustomer,
};
