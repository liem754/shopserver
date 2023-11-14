const user = require("./user");

const initRouter = (app) => {
  app.use("/api/user", user);

  return app.use("/", (req, res) => {
    res.send("This router is not defined !");
  });
};
module.exports = initRouter;
