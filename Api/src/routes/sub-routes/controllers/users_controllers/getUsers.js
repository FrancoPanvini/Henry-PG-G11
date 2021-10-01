const { Users, Cities, Provinces, Countries, UsersType } = require("../../../../db");
const { Op } = require("sequelize");

const getUsers = async (req, res) => {
  const { city, province, country, userTypeId } = req.query
  const query = {
    where: {},
    attributes: ["id", "name", "mail", "phone", "direction", "password", "photo", "responsable", "dni", "description", "link_web", "link_instagram", "link_facebook", "link_donaciones", "CityId", "UsersTypeId"],
    include: [
      {
        model: Cities,
        attributes: ["name", "ProvinceId"],
        required: true,
        include: { model: Provinces, attributes: ["name", "CountryId"], required: true, where: {}, include: { model: Countries, required: true, attributes: ["name", "code"] } },
      },
      {model:UsersType}
      /* { model: Pets }, */
      /* { model: Events }, */
      /* { model: Adoptions }, */
    ],
  };
  try {
      //Add filter by UserType
  
    if (userTypeId) query.where = { ...query.where, "UsersTypeId": userTypeId }
    
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
module.exports = getUsers;