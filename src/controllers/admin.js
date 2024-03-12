const { signupAdmin } = require("../services/admin");
// const { createResponseObject } = require("../utils/constants");
const { validateAdmin } = require("../validation/admin");

const signup_admin = async (req, res) => {
  try {
    const { error } = validateAdmin.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let resp = {
      error: false,
      auth: true,
      error_message: "",
      data: {},
    };

    const updatedResp = await signupAdmin(req.body, resp);
    console.log(updatedResp.data);
    res.status(201).json({ message: "Admin created successfully" });
    // return res.send(updatedResp);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { signup_admin };
