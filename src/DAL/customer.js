const { Customer } = require("../models/customer");

const customer_signup = async (body) => {
  let customer_user = new Customer({
    user_id: body.user_id,
    first_name: body.first_name,
    last_name: body.last_name,
    gender: body.gender,
    // phone_number: body.phone_number,
    dob: body.dob,
  });
  console.log(customer_user, "customer_user");
  return await customer_user.save();
};

const find_customer_by_user_id = async (id) => {
  return await Customer.findOne({ user_id: id }).populate(
    "user_id",
    "role email _id"
  );
};

const find_user_customer = async (id) => {
  const customer = await Customer.aggregate([
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
        email: 1,
        role: 1,
        gender: 1,
        phone_number: 1,
      },
    },
  ]);
  return customer[0];
};
module.exports = {
  customer_signup,
  find_customer_by_user_id,
  find_user_customer,
};
