const { Adoptions } = require("../../../../db");
const { deleteAdoptionDB } = require("./deleteAdoption");

const postAdoption = async (req, res) => {
  const { residence, residents, adult, dedication, otherPets, otherPetsDesc, oldPets, oldPetsDesc, Userid, Petid } = req.body;

  //* Create new Adoption
  let newAdoption, created;
  try {
    [newAdoption, created] = await Adoptions.findOrCreate({
      where: { UserId: parseInt(Userid), PetId: parseInt(Petid) },
      defaults: {
        residence,
        residents,
        adult,
        dedication,
        otherPets,
        otherPetsDesc,
        oldPets,
        oldPetsDesc,
      },
    });
    if (!created) throw new Error(`You allready have a process with this pet`);

    res.status(200).json(newAdoption);
  } catch (error) {
    if (created) {
      deleteAdoptionDB(newAdoption.dataValues.id);
    }
    res.status(409).send(error.message);
  }
};

module.exports = postAdoption;
