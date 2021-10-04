const { LostPets } = require("../../../../db");
const { deleteLostPetDB } = require("./deleteLostPet");

const postPets = async (req, res) => {
  const { name, size, description, Userid, Cityid, photo } = req.body;

  //* Create new Lost Pet
  let newPet, created;
  try {
    [newPet, created] = await LostPets.findOrCreate({
      where: { name: name.toLowerCase(), UserId: parseInt(Userid) },
      defaults: {
        size,
        description,
        photo,
      },
    });
    if (!created) throw new Error(`${name} allready exist as your lost pet`);

    //* Set Owner
    try {
      await newPet.setUser(Userid);
    } catch (error) {
      throw new Error("Problems setting Owner of pet");
    }

    //* Set City
    try {
      await newPet.setCity(Cityid);
    } catch (error) {
      throw new Error("Problems setting City of pet");
    }

    res.status(200).json(newPet);
  } catch (error) {
    if (created) {
      deleteLostPetDB(newPet.dataValues.id);
    }
    res.status(409).send(error.message);
  }
};

module.exports = postPets;