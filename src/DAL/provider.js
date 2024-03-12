const { Provider } = require("../models/provider");
const provider_signup = async (body) => {
  // console.log("AHSANNNNNNNNNNn");
  let provider_user = new Provider({
    user_id: body.user_id,
    location: body.location,
    language: body.language,
    practice: body.practice,
    education: body.education,
    speciality: body.speciality,
    first_name: body.first_name,
    experience: body.experience,
    description: body.description,
    phone_number: body.phone_number,
    hospital_affiliation: body.hospital_affiliation,
  });
  console.log(provider_user, "provider_user");
  return await provider_user.save();
};

const find_provider_by_user_id = async (id) => {
  return await Provider.findOne({ user_id: id });
};
const find_provider_user = async (id) => {
  return await Provider.findOne({ user_id: id }).select(
    "first_name last_name "
  );
};
const find_provider_user_id = async (id) => {
  return await Provider.findOne({ user_id: id }).populate(
    "user_id",
    "_id email role"
  );
};
const find_provider_by_id = async (id) => {
  return await Provider.findOne({ _id: id }).populate(
    "user_id",
    "_id email role"
  );
};
module.exports = {
  provider_signup,
  find_provider_by_user_id,
  find_provider_user,
  find_provider_user_id,
  find_provider_by_id,
};
