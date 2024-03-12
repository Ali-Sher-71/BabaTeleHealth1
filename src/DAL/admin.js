const { Admin } = require("../models/admin");

const find_user_admin = async (id) => {
  const admin = await Admin.aggregate([
    { $match: { user_id: id } },
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $addFields: {
        email: {
          $arrayElemAt: ["$user.email", 0],
        },
        role: {
          $arrayElemAt: ["$user.role", 0],
        },
      },
    },

    {
      $project: {
        _id: 1,
        user_id: 1,
        first_name: 1,
        last_name: 1,
        dob: 1,
        email: 1,
        profile_image: 1,
        role: 1,
      },
    },
  ]);
  return admin[0];
};
//creating admin
const admin_signup = async (body) => {
  let admin_user = new Admin({
    username: body.username,
    // profile_image: body.profile_image,
    email: body.email,
    password: body.password,
  });
  admin_user = await admin_user.save();
  return admin_user;
};
const find_admin_by_id = async (id) => {
  return await Admin.findOne({ _id: id });
};
const find_admin_id = async (id) => {
  return await Admin.findOne({ _id: id }).lean();
};
const check_email_exist = async (email) => {
  return await Admin.findOne({ email: email });
};
const check_admin_email_exist = async (email) => {
  return await Admin.findOne({ email: email }).select("-password");
};
const find_all_admin = async (id) => {
  return await Admin.find();
};
module.exports = {
  admin_signup,
  find_admin_by_id,
  find_user_admin,
  check_email_exist,
  check_admin_email_exist,
  find_admin_id,
  find_all_admin,
};
