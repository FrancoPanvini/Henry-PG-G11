const { Provinces, Cities } = require('../../../../db');
const { Op } = require('sequelize');

const getProvinces = async (req, res) => {
  const { name, countryId } = req.query;
  const query = {
    where: { name: { [Op.substring]: name } },
    include: [{ model: Cities, attributes: ['id', 'name'] }],
    order: [['name']],
  };
  let provinces;
  if (name && countryId) {
    query.where = { ...query.where, CountryId: countryId };
    provinces = await Provinces.findAll(query);
  } else if (countryId) {
    query.where = { CountryId: countryId };
    provinces = await Provinces.findAll(query);
  } else if (name) {
    provinces = await Provinces.findAll(query);
  } else {
    provinces = await Provinces.findAll();
  }

  res.status(200).json(provinces);
};

module.exports = getProvinces;
