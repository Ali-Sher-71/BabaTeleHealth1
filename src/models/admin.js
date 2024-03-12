const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 255,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    trim: true,
  },
  role: {
    type: String,
    default: "admin",
  },
  phone_number: {
    type: String,
    default: "",
  },
  //   profile_image: {
  //     type: String,
  //     trim: true,
  //     default: "",
  //   },
});

adminSchema.plugin(timestamps);
adminSchema.methods.toJson = function () {
  const admin = this;
  const adminObject = admin.toObject();
  const adminJson = _.pick(adminObject, [
    "_id",
    "username",
    "email",
    "role",
    "phone_number",
    // "profile_image",
    "createdAt",
    "updatedAt",
  ]);
  return adminJson;
};

const Admin = mongoose.model("Admin", adminSchema);
module.exports = { Admin };
