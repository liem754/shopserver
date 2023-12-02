const { createNew, getNews, getNew } = require("../services/new");

const createNewCT = async (req, res) => {
  const { title, description } = req.body;
  try {
    if (!title || !description)
      return res.status(400).json({
        err: -1,
        mes: "Missing input !",
      });

    const rs = await createNew(req.body);

    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "SV error: " + error,
    });
  }
};
const getNewCT = async (req, res) => {
  try {
    const rs = await getNews(req.query);

    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "SV error: " + error,
    });
  }
};
const getNewOne = async (req, res) => {
  const { id } = req.params;
  try {
    const rs = await getNew(id);

    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "SV error: " + error,
    });
  }
};

module.exports = { createNewCT, getNewCT, getNewOne };
