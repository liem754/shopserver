const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token)
    return res.status(402).json({
      err: -1,
      mes: "Invalid token !",
    });

  const accessToken = token.split(" ")[1];

  jwt.verify(accessToken, process.env.JWT, (err, user) => {
    if (err)
      return res.status(402).json({
        err: -1,
        mes: "Token has expired !",
      });

    req.user = user;
    next();
  });
};
module.exports = verifyToken;
