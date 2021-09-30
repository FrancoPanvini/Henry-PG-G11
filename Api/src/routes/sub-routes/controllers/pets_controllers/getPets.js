const { where, Op } = require("sequelize");
const { Pets, Users, PetsType, Cities, Provinces, Countries } = require("../../../../db");

const getPets = async (req, res) => {
  const { type, gender, size, agemin, agemax, city, province, country, owner, adopter, adopted, paglimit, pagnumber } = req.query;

  let query = {
    where: {},
    attributes: ["id", "name", "size", "sex", "age", "PetsTypeId", "createdAt"],
    order: ["createdAt"],
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

  //* Transform res object to fir wanted format
  pets.rows = pets.rows.map(pet => {
    pet = {
      ...pet.dataValues,
      country: pet.dataValues.City.Province.Country.name,
      province: pet.dataValues.City.Province.name,
      city: pet.dataValues.City.name,
      adopter: pet.dataValues.Adopter?.name,
      owner: pet.dataValues.Owner.name,
      type: pet.PetsType.type,
    };
    const { PetsType, PetsTypeId, City, Owner, Adopter, ...rest } = pet;
    return rest;
  });
  pets = { ...pets, paglimit: paglimit, pagnumber: pagnumber };

  res.status(200).json(pets);
};

module.exports = getPets;

/*
  ? http://localhost:3001/pets?
  type=[PetsTypeId]
  gender=[sex]
  size=[size]
  agemin=[number]
  agemax=[number]
  city=[CityId]
  province=[ProvinceId]
  country=[CountryId]
  owner=[Ownerid]
  adopter=[Adopterid]
  adopted =[true/false]
  paglimit=[number of pets per page]
  pagnumber=[number of page startting in 1]

*/

/*
  ?JSON respond
  {
    "count": 4,
    "rows": [
        {
            "id": 44,
            "name": "Pipita",
            "size": "g",
            "sex": "h",
            "age": 8,
            "createdAt": "2021-09-29T16:16:42.564Z",
            "country": "argentina",
            "province": "córdoba",
            "city": "córdoba",
            "owner": "santiago petri",
            "type": "Gato"
        }
    ],
    "paglimit": "3",
    "pagnumber": "2"
}
*/
