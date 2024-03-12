// const otp = require("otp-generator");
// const { User } = require("../models/users");

// async function sendOtp(email) {
//   try {
//     const checkUserPresent = await User.findOne({ email });
//     if (!checkUserPresent) {
//       return { error: "User not found" };
//     }

//     const Otp = otp.generate(6, {
//       upperCase: false,
//       specialChars: false,
//       alphabets: false,
//     });
//     const user = new User({
//       email,
//       otp,
//       otpCreatedAt: new Date(),
//     });

//     await user.save();
//     return { success: true, message: "OTP sent successfully", otp };
//   } catch (error) {
//     return { error: "Something went wrong" };
//   }
// }

// module.exports = {
//   sendOtp,
// };

const otp = require("otp-generator");
const { User } = require("../models/users");

async function sendOtp(email) {
  try {
    const checkUserPresent = await User.findOne({ email });
    if (!checkUserPresent) {
      return { error: "User not found" };
    }

    const generatedOtp = otp.generate(6, {
      upperCase: false,
      specialChars: false,
      alphabets: false,
    });
    const user = new User({
      email,
      otp: generatedOtp, // Assign the generated OTP to user.otp
      otpCreatedAt: new Date(),
    });

    await user.save();
    return {
      success: true,
      message: "OTP sent successfully",
      otp: generatedOtp,
    }; // Return the generated OTP
  } catch (error) {
    return { error: "Something went wrong" };
  }
}

module.exports = {
  sendOtp,
};
