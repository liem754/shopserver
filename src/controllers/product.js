const {
  createProduct,
  getProducts,
  getProduct,
  getProductNext,
  ratingProduct,
} = require("../services/product");

const createProductCT = async (req, res) => {
  const { title, description, price, color, quantity, category } = req.body;
  try {
    if (!title || !description || !price || !color || !quantity || !category)
      return res.status(400).json({
        err: -1,
        mes: "Missing input !",
      });

    const rs = await createProduct(req.body);

    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "SV error: " + error,
    });
  }
};
const getProductCT = async (req, res) => {
  try {
    const rs = await getProducts(req.query);

    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "SV error: " + error,
    });
  }
};
const getProductCTID = async (req, res) => {
  const { pid } = req.params;
  try {
    const rs = await getProduct(pid);

    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "SV error: " + error,
    });
  }
};
const getProductCTIDNext = async (req, res) => {
  const { pid } = req.params;
  try {
    const rs = await getProductNext(pid);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "SV error: " + error,
    });
  }
};
const ratings = async (req, res) => {
  const { id } = req.user;
  const { comment, star, updatedAt } = req.body;
  try {
    if (!comment || !star || !updatedAt)
      return res.status(401).json({
        err: -1,
        mes: "Mising input!",
      });

    const rs = await ratingProduct(req.body, id);

    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "SV error: " + error,
    });
  }
};
module.exports = {
  createProductCT,
  getProductCT,
  getProductCTID,
  getProductCTIDNext,
  ratings,
};
