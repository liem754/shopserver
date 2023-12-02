const Product = require("../models/product");
const { formatCode } = require("../ultils/format");

const createProduct = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      let images = [];
      data?.images?.split(",").forEach((element) => {
        images.push(element);
      });
      const rs = await Product.create({
        title: data?.title,
        description: data?.description,
        price: data?.price,
        quantity: data?.quantity,
        category: formatCode(data?.category),
        color: data?.color,
        images,
      });

      resolve({
        err: rs ? 0 : -1,
        mes: rs ? "Thêm sản phẩm thành công !" : "Thất bại !",
      });
    } catch (error) {
      reject(error);
    }
  });
const getProduct = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await Product.findById(id).populate({
        path: "ratings",
        populate: {
          path: "postedBy",
          select: "name avatar",
        },
      });

      resolve({
        err: rs ? 0 : -1,
        mes: rs ? "Thành công !" : "Thất bại !",
        productData: rs ? rs : null,
      });
    } catch (error) {
      reject(error);
    }
  });
const getProductNext = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await Product.findOne({ _id: { $gt: id } }).populate({
        path: "ratings",
        populate: {
          path: "postedBy",
          select: "name avatar",
        },
      });

      resolve({
        err: rs ? 0 : -1,
        mes: rs ? "Thành công !" : "Thất bại !",
        productData: rs ? rs : null,
      });
    } catch (error) {
      reject(error);
    }
  });
const deleteProduct = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await Product.deleteOne({ _id: id });

      resolve({
        err: rs ? 0 : -1,
        mes: rs ? "Xóa sản phẩm thành công !" : "Thất bại !",
      });
    } catch (error) {
      reject(error);
    }
  });
const ratingProduct = (data, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const kt = await Product.findOne({ _id: data?.pid });

      const alreadyRating = kt?.ratings?.find(
        (el) => el.postedBy.toString() === id
      );
      console.log(alreadyRating);
      if (alreadyRating) {
        // Update star and comment
        const rs = await Product.updateOne(
          {
            ratings: { $elemMatch: alreadyRating },
          },
          {
            $set: {
              "ratings.$.star": data?.star,
              "ratings.$.comment": data?.comment,
              "ratings.$.updatedAt": data?.updatedAt,
            },
          },
          {
            new: true,
          }
        );
        resolve({
          err: rs ? 0 : 1,
          mes: rs ? "Cập nhật đánh giá thành công !" : "Thất bại !",
        });
      } else {
        // Add star and comment
        const rss = await Product.findByIdAndUpdate(
          data?.pid,
          {
            $push: {
              ratings: {
                star: data?.star,
                comment: data?.comment,
                postedBy: id,
                updatedAt: data?.updatedAt,
              },
            },
          },
          { new: true }
        );
        resolve({
          err: rss ? 0 : 1,
          mes: rss
            ? "Đánh giá thành công, cảm ơn bạn đã quan tâm !"
            : "Thất bại !",
        });
      }

      //sum rating
      const updateProduct = await Product.findById(data?.pid);
      const ratingCount = updateProduct.ratings?.length;
      const sumRating = updateProduct.ratings.reduce(
        (sum, el) => sum + +el.star,
        0
      );
      updateProduct.totalRatings =
        Math.round((sumRating * 10) / ratingCount) / 10;
      await updateProduct.save();
    } catch (error) {
      reject(error);
    }
  });
const updateProduct = (data, id) =>
  new Promise(async (resolve, reject) => {
    try {
      // Update star and comment
      const rs = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        err: rs ? 0 : 1,
        mes: rs ? "Cập nhật sản phẩm thành công !" : "Thất bại !",
      });
    } catch (error) {
      reject(error);
    }
  });
const getProducts = (data) =>
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
        formatQueries.title = { $regex: data.title, $options: "i" };
      }
      if (data?.color) {
        formatQueries.color = { $regex: data.color, $options: "i" };
      }
      if (data?.category) {
        formatQueries.category = { $regex: data.category, $options: "i" };
      }
      if (data?.q) {
        // delete formatQueries.q;

        formatQueries["$or"] = [
          { title: { $regex: data.q, $options: "i" } },
          { color: { $regex: data.q, $options: "i" } },
          { category: { $regex: data.q, $options: "i" } },
        ];
      }
      let queryCommand = Product.find(formatQueries);
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
        const counts = await Product.find(formatQueries).countDocuments();
        resolve({
          success: response ? true : false,
          limit,
          products: response ? response : "Cannot get products",
          counts,
        });
      } catch (err) {
        throw new Error(err.message);
      }
    } catch (error) {
      reject(error);
    }
  });
module.exports = {
  createProduct,
  getProduct,
  getProducts,
  deleteProduct,
  ratingProduct,
  getProductNext,
};
