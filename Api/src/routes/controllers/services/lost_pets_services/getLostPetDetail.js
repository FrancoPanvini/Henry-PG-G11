const { LostPets, Users,  Cities, Provinces, Countries, LostPetsPics } = require("../../../../db");

const getLostPetDetail = async (req, res) => {
  const { id } = req.params;

  let query = {
    where: { id },
    attributes: ["id", "name", "size", "photo", "createdAt", "found", "description", "UserId", "lat", "lng"],
    include: [
      {
        model: Cities,
        attributes: ["name", "ProvinceId"],
        required: true,
        include: { model: Provinces, attributes: ["name", "CountryId"], required: true, where: {}, include: { model: Countries, required: true, attributes: ["name"] } },
      },
      { model: LostPetsPics, attributes: ["url"] },
    ],
  };

  //* Obtain pet by id
  let pet = await LostPets.findOne(query);

  //* Transform res object to fix wanted format
  pet = {
    id: pet.id,
    name: pet.name,
    size: pet.size,
    description: pet.description,
    createdAt: pet.createdAt,
    country: pet.dataValues.City.Province.Country.name,
    province: pet.dataValues.City.Province.name,
    city: pet.dataValues.City.name,
    UserId:pet.UserId,
    petPics: pet.LostPetsPics.map(pic => pic.url),
    lat: pet.lat,
    lng: pet.lng,
  };

  res.status(200).json(pet);
};

module.exports = getLostPetDetail;