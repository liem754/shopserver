const {
  register,
  login,
  getOne,
  contact,
  updateCart,
  deleteCart,
  updateUser,
  createOrder,
  getOrders,
  updateOrders,
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
  const { pid, title, price, thumb, quantity, color, size } = req.body;
  try {
    if (!pid || !title || !price || !thumb || !quantity || !color || !size) {
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
const updateUserCt = async (req, res) => {
  const { id } = req.user;
  const { name, email, mobile, address } = req.body;
  try {
    if (!name || !email || !mobile || !address) {
      return res.status(401).json({
        err: -1,
        mes: "Missing input !",
      });
    }
    let data = { name, email, mobile, address };
    if (req.file) data.avatar = req.file.path;
    const rs = await updateUser(data, id);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "Sv error : " + error,
    });
  }
};
const createOrderct = async (req, res) => {
  const { id } = req.user;
  const { cart, address, pay, transpost, total } = req.body;
  try {
    if (!cart || !pay || !transpost || !address || !total) {
      return res.status(401).json({
        err: -1,
        mes: "Missing input !",
      });
    }

    const rs = await createOrder(req.body, id);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "Sv error : " + error,
    });
  }
};
const getOrderct = async (req, res) => {
  const { id } = req.user;

  try {
    const rs = await getOrders(req.query, id);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "Sv error : " + error,
    });
  }
};
const updateOrderct = async (req, res) => {
  const { id } = req.user;
  const { oid, status } = req.body;
  try {
    if (!oid || !status) {
      return res.status(401).json({
        err: -1,
        mes: "Missing input !",
      });
    }

    const rs = await updateOrders(req.body);
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
  updateUserCt,
  createOrderct,
  getOrderct,
  updateOrderct,
};
