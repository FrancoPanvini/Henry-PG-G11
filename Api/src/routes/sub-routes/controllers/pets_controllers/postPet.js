const { Pets } = require("../../../../db");
const { deletePetDB } = require("./deletePet");

const postPets = async (req, res) => {
  const { name, size, sex, age, description, Ownerid, PetsTypeid, Cityid } = req.body;

  //* Create new Pet
  let newPet, created;
  try {
    [newPet, created] = await Pets.findOrCreate({
      where: { name: name.toLowerCase(), Ownerid: parseInt(Ownerid) },
      defaults: {
        size,
        sex,
        age,
        description,
      },
    });
    if (!created) throw new Error(`${name} allready exist as your pet`);

    //* Set Pet type
    try {
      await newPet.setPetsType(PetsTypeid);
    } catch (error) {
      throw new Error("Problems setting type of pet");
    }

    //* Set Owner
    try {
      await newPet.setOwner(Ownerid);
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
    deletePetDB(newPet.dataValues.id);
    res.status(409).send(error.message);
  }
};

module.exports = postPets;
