const RESP = {
  error: false,
  auth: true,
  error_message: "",
  data: {},
};

const createResponseObject = () => ({
  error: false,
  auth: true,
  error_message: "",
  header: "",
  data: {},
  token: "",
});
module.exports = {
  RESP,
  createResponseObject,
};
