const express = require("express");
const { createNewCT, getNewCT, getNewOne } = require("../controllers/new");

const route = express.Router();

route.post("/", createNewCT);
route.get("/", getNewCT);
route.get("/:id", getNewOne);

module.exports = route;
