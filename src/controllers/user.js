const {
  register,
  login,
  getOne,
  contact,
  updateCart,
  deleteCart,
} = require("../services/user");

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
const contactct = async (req, res) => {
  const { email, messege } = req.body;
  try {
    if (!email || !messege) {
      return res.status(401).json({
        err: -1,
        mes: "Missing input !",
      });
    }

    const rs = await contact(req.body);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "Sv error : " + error,
    });
  }
};
const updateCartct = async (req, res) => {
  const { id } = req.user;
  const { pid, title, price, thumb, quantity } = req.body;
  try {
    if (!pid || !title || !price || !thumb || !quantity) {
      return res.status(401).json({
        err: -1,
        mes: "Missing input !",
      });
    }

    const rs = await updateCart(req.body, id);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "Sv error : " + error,
    });
  }
};
const deleteCartct = async (req, res) => {
  const { id } = req.user;
  const { pid } = req.body;
  try {
    if (!pid) {
      return res.status(401).json({
        err: -1,
        mes: "Missing input !",
      });
    }

    const rs = await deleteCart(req.body, id);
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
  contactct,
  updateCartct,
  deleteCartct,
};
