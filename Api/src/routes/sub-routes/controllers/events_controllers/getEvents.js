const { Users, Events, Cities, Provinces, Countries } = require("../../../../db");

const getEvents = async (_req, res) => {
  const query = {
    where: {},
    attributes: ["id", "name", "description", "initDate", "endDate", "direction"],
    include: [
      { model: Users, attributes: ["name"] },
      { model: Cities, attributes: ["name"], include: [{ model: Provinces, attributes: ["name"], include: [{ model: Countries, attributes: ["name"] }] }] },
    ],
  };
  let events = await Events.findAll(query);

  events = events.map((event) => {
    return {
      ...event.dataValues,
      User: event.dataValues.User.name,
      City: event.dataValues.City.name,
      Province: event.dataValues.City.Province.name,
      Country: event.dataValues.City.Province.Country.name,
    };
  });

  res.status(200).json(events);
};

module.exports = getEvents;
