const express = require("express");
const router = express.Router();
const { signup_admin } = require("../controllers/admin");
const { signup_provider } = require("../controllers/provider");
const { signup_customer } = require("../controllers/customer");
const { login, loginProvider } = require("../controllers/auth/login");
const { signup_professional } = require("../controllers/healthPro");

router.post("/admin/signup", signup_admin);
router.post("/provider/signup", signup_provider);
router.post("/customer/signup", signup_customer);
router.post("/professional/signup", signup_professional);
router.post("/login", login);

module.exports = router;
