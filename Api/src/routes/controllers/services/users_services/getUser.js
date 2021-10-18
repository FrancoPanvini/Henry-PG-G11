const { where } = require('sequelize');
const { Users, Cities, Provinces, Countries, UsersType } = require('../../../../db');

const getUser = async (req, res) => {
  const { id } = req.params;

  let query = {
    where: { id },
    // attributes: ["id", "name", "mail", "phone", "direction", "password", "photo", "responsable", "dni", "description", "link_web", "link_instagram", "link_facebook", "link_donaciones"],
    include: [
      {
        model: Cities,
        attributes: ['name', 'ProvinceId'],
        required: true,
        include: { model: Provinces, attributes: ['name', 'CountryId'], required: true, where: {}, include: { model: Countries, required: true, attributes: ['name'] } },
      },
      { model: UsersType, attributes: ['type'] },
    ],
  };

  //* Obtain user by id
  let user = await Users.findOne(query);

  //* Transform res object to fix wanted format
  user = {
    id: user.id,
    name: user.name,
    mail: user.mail,
    phone: user.phone,
    direction: user.direction,
    photo: user.photo,
    responsable: user.responsable,
    dni: user.dni,
    description: user.description,
    link_web: user.link_web,
    link_instagram: user.link_instagram,
    link_facebook: user.link_facebook,
    link_donaciones: user.link_donaciones,
    createdAt: user.createdAt,
    country: user.dataValues.City.Province.Country.name,
    province: user.dataValues.City.Province.name,
    city: user.dataValues.City.name,
    type: user.dataValues.UsersType?.type,
  };

  res.status(200).json(user);
};
module.exports = getUser;
