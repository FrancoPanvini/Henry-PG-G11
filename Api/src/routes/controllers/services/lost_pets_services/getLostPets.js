const { where } = require("sequelize");
const { LostPets, Users, Cities, Provinces, Countries, PetsPics } = require("../../../../db");

const getLostPets = async (req, res) => {
  const { lost, paglimit, pagnumber, city, province, country } = req.query;

  let query = {
    where: {},
    attributes: ["id", "name", "size", "description", "found", "createdAt", "photo"],
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Cities,
        attributes: ["name", "ProvinceId"],
        required: true,
        include: { model: Provinces, attributes: ["name", "CountryId"], required: true, where: {}, include: { model: Countries, required: true, attributes: ["name"] } },
      },
      { model: Users, attributes: ["name"] },
      { model: PetsPics, attributes: ["url"] }
    ],
  };

  //* Add filter by not found
  if (lost) query.where = { ...query.where, found: !lost };

  

  //* Add filter by city
  if (city) query.where = { ...query.where, CityId: city };

  //* Add filter by province
  if (!city) {
    if (province) query.include[0].where = { ProvinceId: province };
  }

  //* Add filter by country
  if (!city && !province) {
    if (country) query.include[0].include.where = { CountryId: country };
  }

  //* Obtain number of rows without pagination
  let lostPets = await LostPets.findAndCountAll(query);

  //* Add data for pagination
  if (paglimit && pagnumber) {
    query.limit = paglimit;
    query.offset = (pagnumber - 1) * paglimit;

    lostPets.rows = await LostPets.findAll(query);
  }

  //* Transform res object to fix wanted format
  lostPets.rows = lostPets.rows.map(pet => {
    pet = {
      ...pet.dataValues,
      owner: pet.dataValues.User.name,
      country: pet.dataValues.City.Province.Country.name,
      province: pet.dataValues.City.Province.name,
      city: pet.dataValues.City.name,
      petPics: pet.PetsPics.map(pic => pic.url)
    };
    const { City, User, ...rest } = pet;
    return rest;
  });
  lostPets = { ...lostPets, paglimit: paglimit, pagnumber: pagnumber };

  res.status(200).json(lostPets);
};

module.exports = getLostPets;
