const New = require("../models/new");

const createNew = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      let images = [];
      data?.images?.split(",").forEach((element) => {
        images.push(element);
      });
      const rs = await New.create({
        title: data?.title,
        description: data?.description,
        images,
      });

      resolve({
        err: rs ? 0 : 1,
        mes: rs ? "Tạo thành công !" : "Thất bại !",
      });
    } catch (error) {
      reject(error);
    }
  });

const getNews = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      //format sang mongoge
      let queryString = JSON.stringify(data);
      queryString = queryString.replace(
        /\b(gte|gt|lt|lte)\b/g,
        (macthedEl) => `$${macthedEl}`
      );
      const formatQueries = JSON.parse(queryString);
      //lọc
      if (data?.title) {
        formatQueries.title = { $regex: queries.title, $options: "i" };
      }
      if (data?.color) {
        formatQueries.color = { $regex: queries.color, $options: "i" };
      }
      if (data?.category) {
        formatQueries.category = { $regex: queries.category, $options: "i" };
      }

      let queryCommand = New.find(formatQueries);
      // 2) Sorting
      if (data?.sort) {
        const sortBy = data.sort.split(",").join(" ");
        queryCommand = queryCommand.sort(sortBy);
      }

      // Filter limit
      if (data?.fields) {
        const fields = data.fields.split(",").join(" ");
        queryCommand = queryCommand.select(fields);
      }

      // Pagination
      const page = +data?.page || 1;
      const limit = +data.limit || 6;
      const skip = (page - 1) * limit;
      queryCommand.skip(skip).limit(limit);
      //Excute query
      try {
        const response = await queryCommand.exec();
        const counts = await New.find(formatQueries).countDocuments();
        resolve({
          success: response ? true : false,
          limit,
          news: response ? response : "Cannot get products",
          counts,
        });
      } catch (err) {
        throw new Error(err.message);
      }
    } catch (error) {
      reject(error);
    }
  });
const getNew = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await New.findById(id);
      resolve({
        err: rs ? 0 : 1,
        mes: rs ? "Xóa thành công !" : "Thất bại !",
        new: rs,
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  createNew,
  getNews,
  getNew,
};
