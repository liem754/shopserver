const express = require("express");
const { registerCT, loginCT, getOneCT } = require("../controllers/user");
const verifyToken = require("../middlewares/verify_token");
const route = express.Router();
route.post("/register", registerCT);
route.post("/login", loginCT);

route.use(verifyToken);
route.get("/", getOneCT);

module.exports = route;
