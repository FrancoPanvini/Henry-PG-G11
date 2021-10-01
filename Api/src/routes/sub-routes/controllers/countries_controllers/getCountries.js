const { Users, Countries, Provinces, Cities } = require("../../../../db");
const { Op } = require("sequelize");

const axios = require('axios')



const getCountries = async(req, res) => {
  const {name} = req.query
  const query = {
    where: { name: {[Op.substring]: name}},
    include: [
      { model: Provinces },
    ],
  };
  let countries;
  if(name) {
    countries = await Countries.findAll(query)}
  else {
    countries = await Countries.findAll()}

  res.json(countries)
}


module.exports = getCountries;
