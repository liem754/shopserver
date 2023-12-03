const { createAccessToken } = require("../middlewares/jwt");
const User = require("../models/user");
const Order = require("../models/order");
const { sendMail, sendMail1 } = require("../ultils/sendMail");

const register = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await User.findOne({ email: data?.email });

      if (rs) {
        resolve({
          err: 1,
          mes: "Email đã được sử dụng, vui lòng đăng nhập !",
        });
      } else {
        const rss = await User.create(data);

        resolve({
          err: rss ? 0 : 1,
          mes: rss ? "Đăng ký thành công, vui lòng đăng nhập !" : "thất bại !",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
const login = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await User.findOne({ email: data?.email });

      if (!rs) {
        resolve({
          status: 401,
          err: -1,
          mes: "Tài khoản không tồn tại, vui lòng đăng ký !",
        });
      } else {
        if (await rs.isCorrectPassword(data?.password)) {
          const accessToken = createAccessToken(rs._id, rs.role);
          resolve({
            err: 0,
            mes: "Đăng nhập thành công!",
            accessToken: accessToken ? `Bearer ${accessToken}` : accessToken,
          });
        } else {
          resolve({
            status: 401,

            err: -1,
            mes: "Sai password !",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
const getOne = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await User.findOne({ _id: id }).select("-password -role");

      resolve({
        err: rs ? 0 : -1,
        mes: rs ? "Thành công !" : "Thất bại !",
        userData: rs,
      });
    } catch (error) {
      reject(error);
    }
  });

const contact = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const main = {
        email: data?.email,
        html: "Cảm ơn bạn đã gữi liên hệ, Chúng tôi sẽ trả lời câu hỏi của bạn trong thời gian sớm nhất !",
        subject: "Phản hồi từ Cửa hàng thời trang MOSA.",
      };

      const rs = await sendMail(main);
      const main1 = {
        email: data?.email,
        html: `${data?.messege}`,
        subject: `Người dùng ${data?.email} gửi liên hệ đến Cửa hàng thời trang MOSA.`,
      };

      const rss = await sendMail1(main1);
      resolve({
        err: rs && rss ? 0 : -1,
        mes: rs && rss ? "Thành Công" : "Thất bại ",
      });
    } catch (error) {
      reject(error);
    }
  });
const createOrder = (data, id) =>
  new Promise(async (resolve, reject) => {
    try {
      if (data?.address) {
        await User.findByIdAndUpdate(
          id,
          { address: data?.address, cart: [] },
          { new: true }
        );
      }
      const rs = await Order.create({
        products: data?.cart,
        transpost: data?.transpost,
        total: data?.total,
        pay: data?.pay,
        address: data?.address,
        orderBy: id,
      });

      resolve({
        err: rs ? 0 : -1,
        mes: rs
          ? "Đặt hàng thành công! Vui lòng kiểm tra lịch sử mua hàng !"
          : "Thất bại ",
      });
    } catch (error) {
      reject(error);
    }
  });
const updateUser = (data, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await User.findByIdAndUpdate(
        id,
        data,

        {
          new: true,
        }
      );

      resolve({
        err: rs ? 0 : -1,
        mes: rs ? "Cập nhật thông tin thành công!" : "Some thing went wrong!",
      });
    } catch (error) {
      reject(error);
    }
  });
const deleteCart = (data, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await User.findByIdAndUpdate(
        id,
        { $pull: { cart: { product: data?.pid } } },

        {
          new: true,
        }
      );

      resolve({
        err: rs ? 0 : -1,
        mes: rs ? "Đã Xóa Sản Phẩm Khỏi Giỏ Hàng!" : "Some thing went wrong!",
      });
    } catch (error) {
      reject(error);
    }
  });
const getOrders = (data, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await Order.find({ orderBy: id, status: data?.status });

      resolve({
        err: rs ? 0 : -1,
        mes: rs ? "Thành công !" : "Some thing went wrong!",
        orders: rs,
      });
    } catch (error) {
      reject(error);
    }
  });

const updateOrders = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await Order.findByIdAndUpdate(
        data?.oid,
        {
          status: data?.status,
        },
        { new: true }
      );

      resolve({
        err: rs ? 0 : -1,
        mes: rs ? "Cập nhật đơn hàng thành công !" : "Some thing went wrong!",
      });
    } catch (error) {
      reject(error);
    }
  });
const updateCart = (data, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const kt = await User.findById(id);

      const kt2 = kt?.cart?.find((el) => el.product.toString() === data?.pid);
      if (kt2) {
        const rs = await User.updateOne(
          {
            cart: { $elemMatch: kt2 },
          },
          {
            $set: {
              "cart.$.price": data?.price,
              "cart.$.quantity": data?.quantity,
              "cart.$.color": data?.color,
              "cart.$.size": data?.size,
            },
          },
          {
            new: true,
          }
        );
        resolve({
          err: rs ? 0 : -1,
          mes: rs ? "Cập nhật giỏ hàng thành Công" : "Thất bại ",
        });
      } else {
        const rss = await User.findByIdAndUpdate(
          id,
          {
            $push: {
              cart: {
                product: data?.pid,
                quantity: data?.quantity,
                price: data?.price,
                thumb: data?.thumb,
                title: data?.title,
                color: data?.color,
                size: data?.size,
              },
            },
          },
          {
            new: true,
          }
        );
        resolve({
          err: rss ? 0 : -1,
          mes: rss ? "Đã thêm vào giỏ hàng" : "Thất bại ",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
module.exports = {
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
};
