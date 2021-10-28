const { Pets } = require('../../../../db');

async function putPet(req, res) {
  const { id } = req.params;
  const { name, size, sex, age, description, PetsTypeId, CityId } = req.body;

  try {
    await Pets.update({ name, size, sex, age, description, PetsTypeId, CityId }, { where: { id: parseInt(id) } });
    const pet = await Pets.findOne({ where: { id: parseInt(id) } });
    res.status(200).json(pet);
  } catch (error) {
    res.status(409).send(error.message);
  }
}

module.exports = putPet;
