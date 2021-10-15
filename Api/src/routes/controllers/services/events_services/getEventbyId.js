const { Events, Cities, Provinces, Countries, Users } = require("../../../../db");

const getEventById = async (req, res) => {
  const { id } = req.params;

  const query = {
    where: { id },
    attributes: ["id", "name", "description", "initDate", "endDate", "direction", "photo"],
    order: ["initDate"],
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

  //* Obtain event by id
  let event = await Events.findOne(query);

  //* Transform res object to fix wanted format
  event = {
    ...event.dataValues,
    country: event.dataValues.City.Province.Country.name,
    province: event.dataValues.City.Province.name,
    city: event.dataValues.City.name,
    organizer: event.dataValues.User.name,
  };
  const { City, User, ...rest } = event;

  res.status(200).json(rest);
};

module.exports = getEventById;
