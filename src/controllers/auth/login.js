const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Admin } = require("../../models/admin");
const { validateLogin } = require("../../validation/login");
const { find_user_email_for_login } = require("../../DAL/user");
const { find_provider_by_user_id } = require("../../DAL/provider");
const { find_customer_by_user_id } = require("../../DAL/customer");
const { find_professional_by_user_id } = require("../../DAL/healthPro");
const { sendOtp } = require("../../utils/otp");

const adminLogin = async (req, res) => {
  try {
    const { error } = validateLogin.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    console.log({ passwordMatch });
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Admin logged in successfully", token });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    const { error } = validateLogin.validate(req.body);
    if (error) {
      return res.json({ error: error.details[0].message });
    }

    const user = await find_user_email_for_login(req.body);
    if (!user) {
      return res.json({ error: "Invalid Credentials" });
    }

    let detail;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const otp = await sendOtp(user.email);

    if (user.role == "customer") {
      detail = await find_customer_by_user_id(user._id, token, otp);
      if (!detail) {
        return res.json({ error: "Something Went Wrong!" });
      }
    } else if (user.role == "provider") {
      detail = await find_provider_by_user_id(user._id, token, otp);
      if (!detail) {
        return res.json({ error: "Something Went Wrong!" });
      }
    } else if (user.role == "professional") {
      detail = await find_professional_by_user_id(user._id, token, otp);
      if (!detail) {
        return res.json({ error: "Something Went Wrong!" });
      }
    } else {
      return res.json({ error: "Invalid Role" });
    }
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isValidPassword) {
      return res.json({ error: "Incorrect Password" });
    }

    await detail.save();
    return res.json({ message: "Logged in successfully", detail, token, otp });
  } catch (error) {
    console.log(error.message);
    return res.json({ error });
  }
};

module.exports = { login, adminLogin };
