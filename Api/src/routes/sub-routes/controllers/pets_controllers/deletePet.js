const { Pets, Adoptions, PetsPics } = require("../../../../db");

const deletePetDB = async id => {
  const pet = await Pets.findOne({ where: { id } });
  if (!pet) throw new Error(`Pet does not exist`);
  await Adoptions.destroy({ where: { PetId: id } });
  await Pets.destroy({ where: { id } });
  await PetsPics.destroy({ where: { PetId: id } });
  return pet;
};

const deletePet = async (req, res) => {
  const { id } = req.params;
  try {
    let response = await deletePetDB(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(409).send(error.message);
  }
};

module.exports = { deletePet, deletePetDB };
