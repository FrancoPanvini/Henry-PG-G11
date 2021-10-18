const { Cities } = require('../../../../db');
const { Op } = require('sequelize');

const getCities = async (req, res) => {
  const { name, provinceId } = req.query;
  const query = {
    where: { name: { [Op.substring]: name } },
    order: [['name']],
  };
  let cities;
  if (name && provinceId) {
    query.where = { ...query.where, ProvinceId: provinceId };
    cities = await Cities.findAll(query);
  } else if (provinceId) {
    query.where = { ProvinceId: provinceId };
    cities = await Cities.findAll(query);
  } else if (name) {
    cities = await Cities.findAll(query);
  } else {
    cities = await Cities.findAll();
  }

  res.status(200).json(cities);
};

module.exports = getCities;
