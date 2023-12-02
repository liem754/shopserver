const user = require("./user");
const category_product = require("./category_product");
const product = require("./product");
const neww = require("./new");

const initRouter = (app) => {
  app.use("/api/user", user);
  app.use("/api/categorypd", category_product);
  app.use("/api/product", product);
  app.use("/api/new", neww);

  return app.use("/", (req, res) => {
    res.send("This router is not defined !");
  });
};
module.exports = initRouter;
