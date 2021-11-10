const { LostPets } = require('../../../../db');

const deleteLostPetDB = async id => {
  const pet = await LostPets.findOne({ where: { id } });
  if (!pet) throw new Error(`Pet does not exist`);
  await LostPets.destroy({ where: { id } });
  return pet;
};

const deleteLostPet = async (req, res) => {
  const { id } = req.params;
  try {
    let response = await deleteLostPetDB(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(409).send(error.message);
  }
};

module.exports = { deleteLostPetDB, deleteLostPet };
