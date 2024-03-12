const { validateProvider } = require("../validation/provider");
const { signupProvider } = require("../services/provider");

const signup_provider = async (req, res) => {
  // console.log("BODYYYYYYYYY", req.body);
  try {
    // try {
    //   await validateProvider(req.body);
    // } catch (e) {
    //   return res
    //     .status(400)
    //     .json({ code: 400, message: e.details[0].message.replace(/\"/g, "") });
    // }
    const { error } = validateProvider.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let resp = {
      error: false,
      auth: true,
      error_message: "",
      data: {},
    };

    const RESP = await signupProvider(req.body, resp);
    console.log(RESP.data, "RESPONSE");
    res.status(201).json({
      message: "Provider created successfully",
      provider: RESP.data,
      code: 201,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { signup_provider };
