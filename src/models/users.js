const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const userSchema = new mongoose.Schema({
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
    requried: true,
    enum: ["admin", "customer", "provider", "professional"],
  },
});

userSchema.plugin(timestamps);
userSchema.methods.toJson = function () {
  const user = this;
  const userObject = user.toObject();
  const userJson = _.pick(userObject, [
    "_id",
    "email",
    "password",
    "role",
    "createdAt",
    "updatedAt",
  ]);
  return userJson;
};
const User = mongoose.model("User", userSchema);
module.exports = { User };
