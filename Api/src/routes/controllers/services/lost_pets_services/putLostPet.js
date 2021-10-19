const { LostPets } = require("../../../../db");

async function putLostPet(req, res) {
  const { id } = req.params;
  const { name, size, description } = req.body;

  try {
    await LostPets.update({ name, size, description }, { where: { id: parseInt(id) } });
    const pet = await LostPets.findOne({ where: { id: parseInt(id) } });
    res.status(200).json(pet);
  } catch (error) {
    res.status(409).send(error.message);
  }
}

module.exports = putLostPet;
