const CategoryProduct = require("../models/category_product");
const { formatCode } = require("../ultils/format");

const createCategoryPD = (category) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await CategoryProduct.create({
        code: formatCode(category),
        value: category,
      });

      resolve({
        err: rs ? 0 : 1,
        mes: rs ? "Tạo thành công !" : "Thất bại !",
      });
    } catch (error) {
      reject(error);
    }
  });

const getCategoryPD = () =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await CategoryProduct.find();
      resolve({
        err: rs ? 0 : 1,
        mes: rs ? "Lấy thành công !" : "Thất bại !",
        categorys: rs,
      });
    } catch (error) {
      reject(error);
    }
  });
const deleteCategoryPD = () =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await CategoryProduct.deleteMany();
      resolve({
        err: rs ? 0 : 1,
        mes: rs ? "Xóa thành công !" : "Thất bại !",
        categorys: rs,
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  createCategoryPD,
  getCategoryPD,
  deleteCategoryPD,
};
