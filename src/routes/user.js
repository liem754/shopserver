const express = require("express");
const {
  registerCT,
  loginCT,
  getOneCT,
  contactct,
  updateCartct,
  deleteCartct,
} = require("../controllers/user");
const verifyToken = require("../middlewares/verify_token");
const route = express.Router();
route.post("/register", registerCT);
route.post("/login", loginCT);

route.use(verifyToken);
route.get("/", getOneCT);
route.post("/contact", contactct);
route.put("/cart", updateCartct);
route.put("/deletecart", deleteCartct);

module.exports = route;
