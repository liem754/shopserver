const formatCode = (value) => {
  let kq = "";
  value?.split(" ").map((item) => {
    kq += item.charAt(0).toUpperCase();
  });
  return kq.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

module.exports = { formatCode };
