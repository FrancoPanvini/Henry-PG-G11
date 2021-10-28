const { Countries, Provinces, Cities } = require('../../../../db');

const getLocations = async (req, res) => {
  const { country } = req.query;

  let query = {
    attributes: ['name'],
    include: [{ model: Provinces, attributes: ['name'], include: [{ model: Cities, attributes: ['name'] }] }],
  };
  if (country) {
    query = { ...query, where: { name: country.toLowerCase() } };
  }

  try {
    const cityList = await Countries.findAll(query);
    res.status(200).json(cityList);
  } catch (error) {
    console.log(error);
    res.status(409).send(error);
  }
};

module.exports = getLocations;
