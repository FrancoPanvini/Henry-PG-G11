const { LostPets } = require('../../../../db');

const putFoundLostPet = async (req, res) => {
  const { id } = req.params;

  //* Change "found" state in pet to true (found)
  let lostPet;
  try {
    //* Find lost pet in db, check it's state
    lostPet = await LostPets.findOne({ where: { id: parseInt(id) } });
    if (!lostPet) throw new Error(`This pet does not exist in our database`);
    if (!(lostPet.dataValues.found === false)) throw new Error(`This pet has already been found`);

    //* Update it's status as found
    await lostPet.update({ found: true });

    res.status(200).json(lostPet);
  } catch (error) {
    res.status(409).send(error.message);
  }
};

module.exports = putFoundLostPet;
