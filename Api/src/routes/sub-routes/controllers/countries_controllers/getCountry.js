const { Countries, Provinces } = require("../../../../db");
const { Op } = require("sequelize");

const getCountry = async (req, res) => {
  const { id } = req.params;
  const query = {
    where: { id: id },
  };
  try {
    const country = await Countries.findAll(query);
    res.json(...country)
  } catch (error) {
    res.status(409).send(error);
  }
};
module.exports = getCountry;