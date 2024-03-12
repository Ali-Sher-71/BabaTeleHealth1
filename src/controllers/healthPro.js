const { validateProfessional } = require("../validation/healthPro");
const { signupProfessional } = require("../services/healthPro");

const signup_professional = async (req, res) => {
  //   console.log("BODYYYYYYYYY", req.body);
  try {
    const { error } = validateProfessional.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let resp = {
      error: false,
      auth: true,
      error_message: "",
      data: {},
    };

    const RESP = await signupProfessional(req.body, resp);
    console.log(RESP.data, "RESPONSE");
    res.status(201).json({
      message: "Professional created successfully",
      professional: RESP.data,
      code: 201,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { signup_professional };
