const express = require("express");
const {
  getCategoryPDCT,
  createCategoryPDCT,
  deleteCategoryPDCT,
} = require("../controllers/category_product");

const route = express.Router();
route.post("/", createCategoryPDCT);
route.get("/", getCategoryPDCT);
route.delete("/", deleteCategoryPDCT);

module.exports = route;
