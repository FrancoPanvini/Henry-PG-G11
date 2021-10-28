const { where, Op } = require('sequelize');
const { Users, Events, Cities, Provinces, Countries } = require('../../../../db');

const getEvents = async (req, res) => {
  const { city, province, country, organizer, pending, paglimit, pagnumber } = req.query;

  const query = {
    where: {},
    attributes: ['id', 'name', 'description', 'initDate', 'endDate', 'direction', 'photo', 'lat', 'lng'],
    order: ['initDate'],
    include: [
      {
        model: Cities,
        attributes: ['name', 'ProvinceId'],
        required: true,
        include: { model: Provinces, attributes: ['name', 'CountryId'], required: true, where: {}, include: { model: Countries, required: true, attributes: ['name'] } },
      },
      { model: Users, attributes: ['name'] },
    ],
  };

  //* Add filter by events pending in the future
  if (pending) {
    let today = new Date();
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    query.where = { ...query.where, initDate: { [Op.gte]: yesterday } };
  }

  //* Add filter by city
  if (city) query.where = { ...query.where, CityId: city };

  //* Add filter by provinces
  if (!city) {
    if (province) query.include[0].where = { ProvinceId: province };
  }

  //* Add filter by country
  if (!city && !province) {
    if (country) query.include[0].include.where = { CountryId: country };
  }

  //* Add filter by event organizer
  if (organizer) query.where = { ...query.where, UserId: organizer };

  //* Obtain number of rows without pagination
  let events = await Events.findAndCountAll(query);

  //* Add data for pagination
  if (paglimit && pagnumber) {
    query.limit = paglimit;
    query.offset = (pagnumber - 1) * paglimit;

    events.rows = await Events.findAll(query);
  }

  //* Transform res object to fix wanted format
  events.rows = events.rows.map(event => {
    event = {
      ...event.dataValues,
      country: event.dataValues.City.Province.Country.name,
      province: event.dataValues.City.Province.name,
      city: event.dataValues.City.name,
      organizer: event.dataValues.User.name,
    };
    const { City, User, ...rest } = event;
    return rest;
  });
  events = { ...events, paglimit: paglimit, pagnumber: pagnumber };

  res.status(200).json(events);
};

module.exports = getEvents;
