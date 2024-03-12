const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const providerSchema = new mongoose.Schema({
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
  phone_number: {
    type: String,
    default: "",
  },
 city : {
    type: String,
    trim: true,
  },
  region: {
    type: String,
    trim: true,
 },
  language: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
  education: {
    type: String,
    trim: true,
    default: "",
  },
  experience: {
    type: String,
    trim: true,
    default: "",
  },
  hospital_affiliation: {
    type: String,
    trim: true,
    default: "",
  },
  speciality: {
    type: String,
    trim: true,
    default: "",
  },
  practice: {
    type: String,
    trim: true,
    default: "",
  },
  //   profile_image: {
  //     type: String,
  //     trim: true,
  //     default: "",
  //   },
});

providerSchema.plugin(timestamps);
providerSchema.methods.toJson = function () {
  const provider = this;
  const providerObject = provider.toObject();
  const providerJson = _.pick(providerObject, [
    "_id",
    "user_id",
    "first_name",
    "phone_number",
    "city",
    "region",
    "language",
    "description",
    "education",
    "experience",
    "hospital_affiliation",
    "speciality",
    "practice",
    // "profile_image",
    "createdAt",
    "updatedAt",
  ]);
  return providerJson;
};

const provider = mongoose.model("provider", providerSchema);
exports.Provider = provider;
