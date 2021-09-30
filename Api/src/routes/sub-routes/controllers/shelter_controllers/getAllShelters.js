const { Users, Cities, Provinces, Countries, Pets, Events } = require("../../../../db");
const { Op } = require("sequelize");

const getAllShelters = async (req, res) => {
  const { city, province, country } = req.query
  const query = {
    where: { UsersTypeId: "r" },
    attributes: ["id", "name", "mail", "phone", "direction", "password", "photo", "responsable", "dni", "description", "link_web", "link_instagram", "link_facebook", "link_donaciones"],
    include: [
      {
        model: Cities,
        attributes: ["name", "ProvinceId"],
        required: true,
        include: { model: Provinces, attributes: ["name", "CountryId"], required: true, where: {}, include: { model: Countries, required: true, attributes: ["name", "code"] } },
      },
      { model: Pets },
      { model: Events },
    ],
  };
  try {
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
    const user = await Users.findAll(query);
    res.json(user);
  } catch (error) {
    res.status(409).send(error.message);
  }
};
module.exports = getAllShelters;
