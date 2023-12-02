const isAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "2002")
    return res.status(402).json({
      err: -1,
      mes: "Yên cầu quyền admin !",
    });
};
