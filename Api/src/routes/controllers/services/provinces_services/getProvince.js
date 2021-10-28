const { Provinces } = require('../../../../db');

const getProvince = async (req, res) => {
  const { id } = req.params;
  const query = {
    where: { id: id },
  };
  try {
    const province = await Provinces.findAll(query);
    res.json(...province);
  } catch (error) {
    res.status(409).send(error);
  }
};
module.exports = getProvince;
