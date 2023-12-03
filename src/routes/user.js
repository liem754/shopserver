const express = require("express");
const uploadCloud = require("../config/cloudinary.config");
const {
  registerCT,
  loginCT,
  getOneCT,
  contactct,
  updateCartct,
  deleteCartct,
  updateUserCt,
  createOrderct,
  getOrderct,
  updateOrderct,
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
route.put("/update", uploadCloud.single("avatar"), updateUserCt);
route.post("/order", createOrderct);
route.get("/all-order", getOrderct);
route.put("/update-status", updateOrderct);

module.exports = route;
