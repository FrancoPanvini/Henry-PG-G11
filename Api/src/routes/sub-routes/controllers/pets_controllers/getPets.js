const { where, Op } = require("sequelize");
const { Pets, Users, PetsType, Cities, Provinces, Countries, PetsPics } = require("../../../../db");

const getPets = async (req, res) => {
  const { type, gender, size, agemin, agemax, city, province, country, owner, adopter, adopted, paglimit, pagnumber } = req.query;

  let query = {
    where: {},
    attributes: ["id", "name", "size", "sex", "age", "createdAt"],
    order: ["createdAt"],
    include: [
      {
        model: Cities,
        attributes: ["name", "ProvinceId"],
        required: true,
        include: { model: Provinces, attributes: ["name", "CountryId"], required: true, where: {}, include: { model: Countries, required: true, attributes: ["name"] } },
      },
      { model: PetsType, attributes: ["type"] },
      { model: Users, as: "Owner", attributes: [] },
      { model: Users, as: "Adopter", attributes: [] },
      { model: PetsPics, attributes: ["url"], limit: 1 },
    ],
  };

  //* Add filter by type of pet
  if (type) query.where = { ...query.where, PetsTypeId: type };

  //* Add filter by gender of pet
  if (gender) query.where = { ...query.where, sex: gender };

  //* Add filter by size of pet
  if (size) query.where = { ...query.where, size: size };

  //* Add filter by age of pet
  if (agemin && agemax) query.where = { ...query.where, age: { [Op.between]: [agemin, agemax] } };
  if (agemin && !agemax) query.where = { ...query.where, age: { [Op.gte]: agemin } };
  if (!agemin && agemax) query.where = { ...query.where, age: { [Op.lte]: agemax } };

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

  //* Add filter by owner of pet
  if (owner) query.where = { ...query.where, Ownerid: owner };

  //* Add filter by adopter of pet
  if (adopter) query.where = { ...query.where, Adopterid: adopter };

  //* Add filter by adopter of pet
  if (adopted) query.where = { ...query.where, adopted: adopted };

  //* Obtain number of rows without pagination
  let pets = await Pets.findAndCountAll(query);

  //* Add data for pagination
  if (paglimit && pagnumber) {
    query.limit = paglimit;
    query.offset = (pagnumber - 1) * paglimit;

    pets.rows = await Pets.findAll(query);
  }

  //* Transform res object to fix wanted format
  pets.rows = pets.rows.map(pet => {
    pet = {
      ...pet.dataValues,
      country: pet.dataValues.City.Province.Country.name,
      province: pet.dataValues.City.Province.name,
      city: pet.dataValues.City.name,
      type: pet.PetsType?.type, // ← esto me tiraba error al hacer un GET a /pets, por eso agregué el signo de pregunta, pero segurísimo hay que revisar
      petPic: pet.PetsPics[0]?.url,
    };
    const { PetsType, City, Owner, Adopter, PetsPics, ...rest } = pet;
    return rest;
  });
  pets = { ...pets, paglimit: paglimit, pagnumber: pagnumber };

  res.status(200).json(pets);
};

module.exports = getPets;
