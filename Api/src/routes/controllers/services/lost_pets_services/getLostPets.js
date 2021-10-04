const { where } = require("sequelize");
const { LostPets, Users, Cities, Provinces, Countries } = require("../../../../db");

const getLostPets = async (req, res) => {
  const { lost, paglimit, pagnumber } = req.query;

  let query = {
    where: {},
    attributes: ["id", "name", "size", "description", "found", "createdAt"],
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Cities,
        attributes: ["name", "ProvinceId"],
        required: true,
        include: { model: Provinces, attributes: ["name", "CountryId"], required: true, where: {}, include: { model: Countries, required: true, attributes: ["name"] } },
      },
      { model: Users, attributes: ["name"] },
    ],
  };

  //* Add filter by not found
  if (lost) query.where = { ...query.where, found: !lost };

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
    };
    const { City, User, ...rest } = pet;
    return rest;
  });
  lostPets = { ...lostPets, paglimit: paglimit, pagnumber: pagnumber };

  res.status(200).json(lostPets);
};

module.exports = getLostPets;
