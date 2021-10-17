const { Users } = require("../../../../db");

async function putUser(req, res) {
  const { id } = req.params;
  const { name, phone, mail, direction, responsable, description,link_donaciones, link_instagram, link_web, link_facebook, CityId, lat, lng, UsersTypeId } = req.body;

  try {
    await Users.update({ name, phone, mail, responsable, description,link_donaciones, link_instagram, link_web, link_facebook, CityId, lat, lng, direction, UsersTypeId }, { where: { id: parseInt(id) } });
    const user = await Users.findOne({ where: { id: parseInt(id) } });
    res.status(200).json(user);
  } catch (error) {
    res.status(409).send(error.message);
  }
}

module.exports = putUser;