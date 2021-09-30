const { where, Op } = require("sequelize");
const { Users, Events, Cities, Provinces, Countries } = require("../../../../db");

const getEvents = async (req, res) => {
  const { initDate, CityId, ProvinceId, CountryId, UserId}  = req.query;

  const query = {
    where: {},
    attributes: ["id", "name", "description", "initDate", "endDate", "direction"],
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

  // Add filter by Date 
  if (initDate) query.where = { ...query.where,  initDate: { [Op.lte]: initDate } } ;

  // Add filter by city
  if (CityId) query.where = { ...query.where, CityId: CityId };

  // Add filter by provinces
  if (!CityId) {
    if (ProvinceId) query.include[0].where = { ProvinceId: ProvinceId };
  }
 
  // Add filter by country
  if (!CityId && !ProvinceId) {
    if ( CountryId) query.include[0].include.where = { CountryId:  CountryId };
  }

  // Add filter by Event organizator
  if (UserId) query.where = { ...query.where, UserId: UserId };

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

//initDate = [initDate]
//CityId=[CityId]
//ProvinceId=[ProvinceId]
//CountryId=[CountryId]
//UserId=[UserId]