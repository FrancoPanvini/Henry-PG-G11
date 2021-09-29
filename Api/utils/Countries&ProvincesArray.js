const { Users, Countries, Provinces } = require("../src/db");
const { Op } = require("sequelize");

const axios = require('axios')

let countries = ['Argentina', 'Bolivia', 'Chile', 'Colombia', 'Costa Rica', 'Cuba', 'Ecuador', 'El Salvador', 'Guatemala', 'Honduras', 'Mexico', 'Nicaragua', 'Panama', 'Paraguay', 'Peru', 'Puerto Rico', 'Dominican Republic', 'Uruguay', 'Venezuela']
const countryMaker = (country) => {
  return {
    ...country,
    states: country.states.map(provinces => ({name: provinces.name}))
  }
}

const countryLoader = async() => {
    
    let promises = countries.map(el => axios.post('https://countriesnow.space/api/v0.1/countries/states',{"country": el}).then(country => countryMaker(country.data.data)))
    const allLocations = await Promise.all(promises)
    const countryNames = allLocations.map(el => ({"name": el.name}))
    countriesAux = await Countries.bulkCreate(countryNames)
    provincesAux = allLocations.map(el => {
      const indexCountry = countries.indexOf(el.name)+1
      return Provinces.bulkCreate(el.states).then(res => res.map(el=> el.setCountry(indexCountry)))
    })
    await Promise.all(provincesAux)

    
}


module.exports = countryLoader;