const { Professional } = require("../models/healthPro");
const professional_signup = async (body) => {
  // console.log("AHSANNNNNNNNNNn");
  let professional_user = new Professional({
    user_id: body.user_id,
    first_name: body.first_name,
    speciality: body.speciality,
    practice: body.practice,
    phone_number: body.phone_number,
    description: body.description,
    language: body.language,
    education: body.education,
    experience: body.experience,
    hospital_affiliation: body.hospital_affiliation,
  });
  console.log(professional_user, "professional_user");
  return await professional_user.save();
};

const find_professional_by_user_id = async (id) => {
  return await Professional.findOne({ user_id: id });
};
const find_professional_user = async (id) => {
  return await Professional.findOne({ user_id: id }).select(
    "first_name last_name "
  );
};
const find_professional_user_id = async (id) => {
  return await Professional.findOne({ user_id: id }).populate(
    "user_id",
    "_id email role"
  );
};
const find_professional_by_id = async (id) => {
  return await Professional.findOne({ _id: id }).populate(
    "user_id",
    "_id email role"
  );
};
module.exports = {
  professional_signup,
  find_professional_by_user_id,
  find_professional_user,
  find_professional_user_id,
  find_professional_by_id,
};
