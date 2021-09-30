const { Pets } = require("../../../../db");

const postPets = async(req, res) => {
    const { name, size, sex, age, description, Ownerid, PetsTypeid, Cityid } = req.body;
  try {
    let petCreated = await Pets.create({
      name,
      size,
      sex,
      age,
      description,
    });
    await petCreated.setOwner(Ownerid);
    await petCreated.setCity(Cityid);
    await petCreated.setPetsType(PetsTypeid)
    res.status(200).send(petCreated);
  } catch (err) {
    res.status(409).send(err)
  }
};

module.exports = postPets
