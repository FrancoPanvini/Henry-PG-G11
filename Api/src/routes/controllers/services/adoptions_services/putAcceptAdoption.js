const { Adoptions, Pets } = require("../../../../db");

const putAcceptAdoption = async (req, res) => {
  const { id } = req.params;

  //* Change state in adoption process to "a" (accepted), then set Pet adopted state as `true` and add its Adopterid
  let process;
  try {
    //* Find process and check wether it is pending or not
    process = await Adoptions.findOne({ where: { id: parseInt(id) } });
    if (!process) throw new Error(`This application process does not exist in our database`);
    if (!(process.dataValues.state === "p")) throw new Error(`This application process has already been resolved`);

    //* Accept process
    await process.update({ state: "a" });

    //* Set pet 'adopted' state to true, and add adopter id
    await Pets.update(
      { adopted: true, Adopterid: parseInt(process.dataValues.UserId) },
      { where: { id: parseInt(process.dataValues.PetId) } }
    );

    //* Close all other pending adoption processes with the same pet
    await Adoptions.update({ state: "c" }, { where: { PetId: parseInt(process.dataValues.PetId), state: "p" } });

    res.status(200).json(process);
  } catch (error) {
    res.status(409).send(error.message);
  }
};

module.exports = putAcceptAdoption;
