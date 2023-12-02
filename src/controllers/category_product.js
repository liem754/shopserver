const {
  createCategoryPD,
  getCategoryPD,
  deleteCategoryPD,
} = require("../services/category_product");

const createCategoryPDCT = async (req, res) => {
  const { category } = req.body;
  try {
    if (!category)
      return res.status(400).json({
        err: -1,
        mes: "Missing input !",
      });

    const rs = await createCategoryPD(category);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      mes: 1,
      mes: "SV error : " + error,
    });
  }
};
const getCategoryPDCT = async (req, res) => {
  try {
    const rs = await getCategoryPD();
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      mes: 1,
      mes: "SV error : " + error,
    });
  }
};
const deleteCategoryPDCT = async (req, res) => {
  try {
    const rs = await deleteCategoryPD();
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      mes: 1,
      mes: "SV error : " + error,
    });
  }
};

module.exports = {
  createCategoryPDCT,
  getCategoryPDCT,
  deleteCategoryPDCT,
};
