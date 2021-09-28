const { Pets, Users } = require("../../../../db");

const getPets = async (_req, res) => {
  const query = {
    where: {},
    attributes: ["id", "name", "size", "sex", "age"],
    include: [
      { model: Users, as: "Owner", attributes: ["name"] },
      { model: Users, as: "Adopter", attributes: ["name"] },
    ],
  };
  let pets = await Pets.findAll(query);

  pets = pets
    .map(pet => {
      return { ...pet.dataValues, Owner: pet.dataValues.Owner.name, Adopter: pet.dataValues.Adopter.name };
    });

  res.status(200).json(pets);
};

module.exports = getPets;
