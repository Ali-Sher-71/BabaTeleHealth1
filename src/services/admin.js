const { admin_signup, check_email_exist } = require("../DAL/admin");
const bcrypt = require("bcrypt");

const signupAdmin = async (body, resp) => {
  const checkingemailexist = await check_email_exist(body.email);

  if (checkingemailexist) {
    resp.error = true;
    resp.error_message = "Email Already Exist!";
    return resp;
  }
  body.role = "admin";

  body.password = await bcrypt.hash(body.password, 10);

  const admin = await admin_signup(body);
  if (!admin) {
    resp.error = true;
    resp.error_message = "Something went wrong!";
    return resp;
  }

  let data = {
    _id: admin._id,
    email: admin.email,
    role: admin.role,
    username: admin.username,
    // profile_image: admin.profile_image,
  };
  resp.data = data;
  return resp;
};

module.exports = {
  signupAdmin,
};

//   if (files !== null && files !== undefined && files !== "") {
//     let file_type = files.profile_image.mimetype;
//     if (IMAGE_TYPES.includes(file_type)) {
//       let filename = path.basename(files.profile_image.name);
//       const upload_img = await UPLOAD_S3_IMAGE(
//         filename,
//         dir,
//         files.profile_image.data
//       );
//       // if image uploaded
//       if (upload_img) {
//         body.profile_image = upload_img.image_file_name;
//       } else {
//         resp.error = true;
//         resp.error_message = "Something went wrong!";
//         return resp;
//       }
//     } else {
//       resp.error = true;
//       resp.error_message = "Please upload an image!";
//       return resp;
//     }
//   }
