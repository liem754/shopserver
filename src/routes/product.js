const express = require("express");
const {
  createProductCT,
  getProductCT,
  getProductCTID,
  getProductCTIDNext,
  ratings,
} = require("../controllers/product");
const verifyToken = require("../middlewares/verify_token");

const route = express.Router();

route.post("/", createProductCT);
route.get("/", getProductCT);
route.get("/one/:pid", getProductCTID);
route.get("/next/:pid", getProductCTIDNext);
route.put("/rating", verifyToken, ratings);

module.exports = route;
