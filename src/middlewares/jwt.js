const jwt = require("jsonwebtoken");
const createAccessToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT, { expiresIn: "2d" });
};

module.exports = {
  createAccessToken,
};
