const { Countries, Provinces, Cities } = require("../../../../db");

const postLocations = async (req, res) => {
  const { country } = req.query;
  const { cityList } = req.body;

  try {
    const [Country, _CountryCreated] = await Countries.findOrCreate({ where: { name: country.toLowerCase() } });
    const CityList = cityList.map(async city => {
      const [Province, _ProvinceCreated] = await Provinces.findOrCreate({
        where: { CountryId: Country.id, name: city[1].toLowerCase() },
      });
      const [City, _CityCreated] = await Cities.findOrCreate({
        where: { ProvinceId: Province.id, name: city[0].toLowerCase() },
      });
      return { ...City, provinceName: Province.name };
    });
    Promise.all(CityList).then(list =>
      res.status(200).json(
        list.map(city => {
          return { ...city.dataValues, provinceName: city.provinceName };
        })
      )
    );
  } catch (error) {
    res.status(409).send(error);
  }
};

module.exports = postLocations;

//* Data expected
//* Params
// localhost:3001/location?country=argentina
//* body
/*  [
    ["Rosario","Santa Fe"],["Santa Fe","Santa Fe"],["Córdoba","Córdoba"],["Buenos Aires","Capital"],["La Plata","Buenos Aires"]
    ]   */
