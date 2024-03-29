const { where, Op } = require('sequelize');

const { LostPets, Users, Cities, Provinces, Countries, LostPetsPics } = require('../../../../db');

const getLostPets = async (req, res) => {
  const { found, paglimit, pagnumber, owner, city, province, country, latMax, latMin, lngMax, lngMin } = req.query;

  let query = {
    where: {},
    attributes: ['id', 'name', 'size', 'description', 'found', 'lat', 'lng', 'createdAt', 'photo', 'updatedAt', 'UserId'],
    order: [['createdAt', 'DESC']],
    include: [
      { model: Users, attributes: ['name'] },
      {
        model: Cities,
        attributes: ['name', 'ProvinceId'],
        required: true,
        include: { model: Provinces, attributes: ['name', 'CountryId'], required: true, where: {}, include: { model: Countries, required: true, attributes: ['name'] } },
      },
      { model: LostPetsPics, attributes: ['url'] },
    ],
  };

  //* Add filter by not found
  if (found === 'true') query.where = { ...query.where, found: true };
  if (found === 'false') query.where = { ...query.where, found: false };

  //* Add filter by city
  if (city) query.where = { ...query.where, CityId: city };

  //* Add filter by province
  if (!city) {
    if (province) query.include[1].where = { ProvinceId: province };
  }

  //* Add filter by country
  if (!city && !province) {
    if (country) query.include[1].include.where = { CountryId: country };
  }

  //* Add filter by owner of pet
  if (owner) query.where = { ...query.where, UserId: owner };

  //*Add filter by coordinates
  if (latMax && latMin && lngMax && lngMin) query.where = { ...query.where, lat: { [Op.between]: [latMin, latMax] }, lng: { [Op.between]: [lngMin, lngMax] } };

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
      owner: pet.dataValues.User?.name,
      country: pet.dataValues.City.Province.Country.name,
      province: pet.dataValues.City.Province.name,
      city: pet.dataValues.City.name,
      petPic: pet.LostPetsPics[0]?.url,
    };
    const { City, User, ...rest } = pet;
    return rest;
  });
  lostPets = { ...lostPets, paglimit: paglimit, pagnumber: pagnumber };

  res.status(200).json(lostPets);
};

module.exports = getLostPets;
