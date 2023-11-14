const express = require("express");
const { registerCT, loginCT } = require("../controllers/user");
const route = express.Router();
route.post("/register", registerCT);
route.post("/login", loginCT);

module.exports = route;
