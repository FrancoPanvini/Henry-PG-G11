const { where } = require("sequelize");
const { Pets, Users, PetsType, Cities, Provinces, Countries, PetsPics } = require("../../../../db");

const getPetDetail = async (req, res) => {
  const { id } = req.params;

  let query = {
    where: { id },
    attributes: ["id", "name", "size", "sex", "age", "createdAt", "adopted", "description"],
    include: [
      {
        model: Cities,
        attributes: ["name", "ProvinceId"],
        required: true,
        include: { model: Provinces, attributes: ["name", "CountryId"], required: true, where: {}, include: { model: Countries, required: true, attributes: ["name"] } },
      },
      { model: PetsType, attributes: ["type"] },
      { model: Users, as: "Owner", attributes: ["name"] },
      { model: Users, as: "Adopter", attributes: ["name"] },
      { model: PetsPics, attributes: ["url"] },
    ],
  };

  //* Obtain pet by id
  let pet = await Pets.findOne(query);

  //* Transform res object to fix wanted format
  pet = {
    id: pet.id,
    name: pet.name,
    size: pet.size,
    sex: pet.sex,
    age: pet.age,
    description: pet.description,
    createdAt: pet.createdAt,
    country: pet.dataValues.City.Province.Country.name,
    province: pet.dataValues.City.Province.name,
    city: pet.dataValues.City.name,
    adopted: pet.adopted,
    adopter: pet.dataValues.Adopter?.name,
    owner: pet.dataValues.Owner.name,
    type: pet.PetsType.type,
    petPics: pet.PetsPics.map(pic => pic.url),
  };

  res.status(200).json(pet);
};

module.exports = getPetDetail;
