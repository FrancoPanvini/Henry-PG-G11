const { Users, Countries, Provinces, Cities } = require("../src/db");
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
    
    //Primer llamado de las provincias de Am. Latina, se le da la forma requerida para la creacion de las mismas
    let promises = countries.map(el => axios.post('https://countriesnow.space/api/v0.1/countries/states',{"country": el}).then(country => countryMaker(country.data.data)))
    const allLocations = await Promise.all(promises)
    //Acomodo del array para cargar los paises
    /* const countryNames = allLocations.map(el => ({"name": el.name, "code": el.iso3}))
    await Countries.bulkCreate(countryNames) */
    promises = allLocations.map(el => Countries.create({"name": el.name, "code": el.iso3}))
    await Promise.all(promises)
    //Armado de promesas para creacion de provincias con relacion a paises
    let provincesAux = allLocations.map((el,i) => {
      return el.states.map(province => Provinces.create({name: province.name}).then(prov => prov.setCountry(i+1)))
    })
    //Traers los mapeos al mismo nivel
    let promise = provincesAux.reduce((acc,el) => {
      return [...acc,...el]
    },[])
    //Creación de provincias
    await Promise.all(promise)
    let prov = await Provinces.findAll({
      include: Countries
    })
    //Armado de provincias y paises para el llamado de ciudades
    prov = prov.map(el => {
      return {
        state: el.name,
        country: el.Country ? el.Country.name : "kuxTrolo",
        id: el.id
      }
    })
    //Magia para crear ciudades
    let citiesPromises = prov.map(el => axios.post('https://countriesnow.space/api/v0.1/countries/state/cities', {"state": el.state, "country": el.country}).then(cities => cities.data.data.map(city => Cities.create({"name":city}).then(res => res.setProvince(el.id)))))
    await setTimeout(()=>console.log("Locations Saved"), 3000);
    await Promise.all(citiesPromises)

}

module.exports = countryLoader;