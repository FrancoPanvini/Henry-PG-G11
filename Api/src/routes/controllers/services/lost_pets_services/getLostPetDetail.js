const { where } = require("sequelize");
const { LostPets, Users,  Cities, Provinces, Countries, } = require("../../../../db");

const getLostPetDetail = async (req, res) => {
  const { id } = req.params;

  let query = {
    where: { id },
    attributes: ["id", "name", "size", "photo", "createdAt", "found", "description", "UserId"],
    include: [
      {
        model: Cities,
        attributes: ["name", "ProvinceId"],
        required: true,
        include: { model: Provinces, attributes: ["name", "CountryId"], required: true, where: {}, include: { model: Countries, required: true, attributes: ["name"] } },
      },
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
    UserId:pet.UserId
    
  };

  res.status(200).json(pet);
};

module.exports = getLostPetDetail;