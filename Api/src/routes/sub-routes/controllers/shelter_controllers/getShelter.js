const { Users } = require("../../../../db");
const { Op } = require("sequelize");

const getShelter = async (req, res) => {
  const { id } = req.params;
  const query = {
    where: { id: id, UsersTypeId: "r" },
    attributes: ["id", "name", "mail", "phone", "direction", "password", "photo", "responsable", "dni", "description", "link_web", "link_instagram", "link_facebook", "link_donaciones"],
    include: [
      {model:Cities, include:[{model: Provinces, include:[{model:Countries, attributes:["name", "code"]}]}]},
      { model: Pets },
      { model: Events },
    ],
  };
  try {
    const user = await Users.findAll(query);
    if (user[0]) {
      res.json(...user);
    } else {
      res.status(404).send("Shelter Not Found");
    }
  } catch (error) {
    res.status(409).send(error);
  }
};
module.exports = getShelter;
