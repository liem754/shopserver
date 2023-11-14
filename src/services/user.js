const { createAccessToken } = require("../middlewares/jwt");
const User = require("../models/user");

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
          err: 1,
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
            err: 1,
            mes: "Sai password !",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
module.exports = {
  register,
  login,
};
