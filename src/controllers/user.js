const { register, login, getOne } = require("../services/user");

const registerCT = async (req, res) => {
  const { name, mobile, email, password } = req.body;
  try {
    if (!name || !mobile || !email || !password) {
      return res.status(401).json({
        err: -1,
        mes: "Missing input !",
      });
    }

    const rs = await register(req.body);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "Sv error : " + error,
    });
  }
};
const loginCT = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(401).json({
        err: -1,
        mes: "Missing input !",
      });
    }

    const rs = await login(req.body);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "Sv error : " + error,
    });
  }
};
const getOneCT = async (req, res) => {
  const { id } = req.user;
  try {
    if (!id) {
      return res.status(401).json({
        err: -1,
        mes: "Missing input !",
      });
    }

    const rs = await getOne(id);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "Sv error : " + error,
    });
  }
};

module.exports = {
  registerCT,
  loginCT,
  getOneCT,
};
