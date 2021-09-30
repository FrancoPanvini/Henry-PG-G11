const { Users, Cities, Provinces, Countries, UsersType } = require("../../../../db");

const getUser = async (req, res) => {
  const { id } = req.params;
  const query = {
    where: { id: id },
    attributes: ["id", "name", "mail", "phone", "direction", "password", "photo", "responsable", "dni", "description", "link_web", "link_instagram", "link_facebook", "link_donaciones"],
    include: [
      {
        model: Cities,
        attributes: ["name", "ProvinceId"],
        required: true,
        include: { model: Provinces, attributes: ["name", "CountryId"], required: true, where: {}, include: { model: Countries, required: true, attributes: ["name", "code"] } },
      },
      {model:UsersType}
      /* { model: Pets }, */
      /* { model: Events }, */
      /* { model: Adoptions }, */
    ],
  };
  try {
    const user = await Users.findAll(query);
    res.json(user);
  } catch (error) {
    res.status(405).send(error.message);
  }
};
module.exports = getUser;
