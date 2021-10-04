const { Users, Countries, Provinces, Cities } = require("../../../../db");
const { Op } = require("sequelize");

const axios = require('axios')



const getProvinces = async(req, res) => {
  const {name, countryId} = req.query
  const query = {
    where: { name: {[Op.substring]: name}},
    include:[{ model: Cities, attributes:["id","name"] }]
  };
  let provinces;
  if(name && countryId) {
    query.where = {...query.where, "CountryId": countryId}
    provinces = await Provinces.findAll(query)
  }
  else if (countryId){
    query.where = {"CountryId": countryId}
    provinces = await Provinces.findAll(query)
  }
  else if(name) {
    provinces = await Provinces.findAll(query)}
  else {
    provinces = await Provinces.findAll()}

  res.json(provinces)
}


module.exports = getProvinces;