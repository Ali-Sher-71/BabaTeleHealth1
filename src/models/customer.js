const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const customerSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  first_name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  // phone_number: {
  //   type: String,
  //   default: "",
  // },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
  },
});

customerSchema.plugin(timestamps);
customerSchema.methods.toJson = function () {
  const customer = this;
  const customerObject = customer.toObject();
  const customerJson = _.pick(customerObject, [
    "_id",
    "user_id",
    "gender",
    "dob",
    "first_name",
    "last_name",
    // "phone_number",
    "createdAt",
    "updatedAt",
  ]);
  return customerJson;
};

const customer = mongoose.model("customer", customerSchema);
exports.Customer = customer;
