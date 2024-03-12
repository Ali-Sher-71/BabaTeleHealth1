// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { find_user_email_for_login } = require("../DAL/user");
// const { find_admin_id } = require("../DAL/admin");
// const { find_user_customer } = require("../DAL/customer");
// const { find_provider_user_id } = require("../DAL/provider");

// const login = async (body, resp) => {
//   const user = await find_user_email_for_login(body);

//   console.log({ user });

//   if (null) {
//     resp.error = true;
//     resp.error_message = "User not found";
//     return resp;
//   }

//   let detail; // Initialize detail variable here
//   if (user.role === "customer") {
//     detail = await find_user_customer(user._id); // Assign value to detail based on user's role
//   } else if (user.role === "provider") {
//     detail = await find_provider_user_id(user._id); // Assign value to detail based on user's role
//   } else if (user.role === "admin") {
//     detail = await find_admin_id(user._id); // Assign value to detail based on user's role
//   } else {
//     resp.error = true;
//     resp.error_message = "Invalid user found";
//     return resp;
//   }

//   if (!detail) {
//     resp.error = true;
//     resp.error_message = "User details not found";
//     return resp;
//   }

//   const validPassword = await bcrypt.compare(body.password, user.password);
//   if (!validPassword) {
//     resp.error = true;
//     resp.error_message = "Invalid password";
//     return resp;
//   }

//   const token = jwt.sign(
//     { _id: user._id, role: user.role },
//     process.env.JWT_SECRET
//   );
//   resp.error = false;
//   resp.error_message = "Login success";
//   resp.token = token;
//   resp.user = detail;
//   return resp;
// };

// module.exports = {
//   login,
// };
