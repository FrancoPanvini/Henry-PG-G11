const { where } = require("sequelize");
const { Users, Cities, Provinces, Countries, UsersType } = require("../../../../db");

const getUsers = async (req, res) => {
  const { city, province, country, type, paglimit, pagnumber } = req.query;
  const query = {
    where: {},
    order: ["createdAt"],
    include: [
      {
        model: Cities,
        attributes: ["name", "ProvinceId"],
        required: true,
        include: { model: Provinces, attributes: ["name", "CountryId"], required: true, where: {}, include: { model: Countries, required: true, attributes: ["name", "code"] } },
      },
      { model: UsersType, attributes: ["type"] },
    ],
  };

  //* Add filter by user type
  if (type) query.where = { ...query.where, UsersTypeId: type };

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
  let users = await Users.findAndCountAll(query);

  //* Add data for pagination
  if (paglimit && pagnumber) {
    query.limit = paglimit;
    query.offset = (pagnumber - 1) * paglimit;

    users.rows = await Users.findAll(query);
  }

  //* Transform res object to fix wanted format
  users.rows = users.rows?.map(user => {
    user = {
      ...user.dataValues,
      country: user.dataValues.City.Province.Country.name,
      province: user.dataValues.City.Province.name,
      city: user.dataValues.City.name,
      type: user.dataValues.UsersType?.type,
    };
    const { UsersType, City, deletedAt, UsersTypeId, CityId, ...rest } = user;
    return rest;
  });
  users = { ...users, paglimit: paglimit, pagnumber: pagnumber };

  res.status(200).json(users);
};
module.exports = getUsers;
