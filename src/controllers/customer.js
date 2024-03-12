const { validateCustomer } = require("../validation/customer");
const { signupCustomer } = require("../services/customer");
const { sendOtp } = require("../utils/otp");

const signup_customer = async (req, res) => {
  try {
    const { error } = validateCustomer.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let RESP = {
      error: false,
      auth: true,
      error_message: "",
      data: {},
    };

    const resp = await signupCustomer(req.body, RESP);
    console.log("RESP", resp);

    res.status(201).json({
      message: "Customer created successfully",
      customer: resp.data,
      code: 201,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { signup_customer };
