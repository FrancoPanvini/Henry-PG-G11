const { Countries, Provinces, Cities } = require("../../../../db");

const postLocations = async (req, res) => {
  const { country, province, city } = req.body;


  try {
    //Checks if Country is already created
    const [Country, _CountryCreated] = await Countries.findOrCreate({ where: { name: country } });
    //Checks if Province is already created
    const [Province, _ProvinceCreated] = await Provinces.findOrCreate({
      where: { CountryId: Country.id, name: province },
    });
    //Check if City is already created
    const [City, _CityCreated] = await Cities.findOrCreate({
        where: { ProvinceId: Province.id, name: city },
      });
      res.status(200).json(City)
    
  } catch (error) {
    res.status(409).send(error);
  }
};

module.exports = postLocations;

//* Data expected
//* Query
// localhost:3001/location?country=argentina
//* body
/*  [
    ["Rosario","Santa Fe"],["Santa Fe","Santa Fe"],["Córdoba","Córdoba"],["Buenos Aires","Capital"],["La Plata","Buenos Aires"]
    ]   */
