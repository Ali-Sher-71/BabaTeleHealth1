const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const professionalSchema = new mongoose.Schema({
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
});

professionalSchema.plugin(timestamps);
professionalSchema.methods.toJson = function () {
  const professional = this;
  const professionalObject = professional.toObject();
  const professionalJson = _.pick(professionalObject, [
    "_id",
    "user_id",
    "first_name",
    "speciality",
    "practice",
    "phone_number",
    "language",
    "description",
    "education",
    "experience",
    "hospital_affiliation",
    // "profile_image",
    "createdAt",
    "updatedAt",
  ]);
  return professionalJson;
};

const professional = mongoose.model("professional", professionalSchema);
exports.Professional = professional;
