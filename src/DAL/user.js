const { User } = require("../models/users");

const signup_user = async (body) => {
  let user = new User({
    email: body.email,
    password: body.password,
    role: body.role,
  });
  return await user.save();
};

const checking_email_exist = async (email) => {
  return await User.findOne({ email: email });
};

const find_user_email_for_login = async (body) => {
  return await User.findOne({ email: body.email });
};

const find_user_email = async (email) => {
  return await User.findOne({ email: email });
};

const find_user_by_id = async (id) => {
  return await User.findOne({ id: id });
};

module.exports = {
  find_user_email,
  find_user_email_for_login,
  find_user_by_id,
  signup_user,
  checking_email_exist,
};
