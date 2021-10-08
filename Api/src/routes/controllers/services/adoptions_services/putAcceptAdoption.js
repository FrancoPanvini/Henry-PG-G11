const { Adoptions } = require("../../../../db");

const putAcceptAdoption = async (req, res) => {
  const { id } = req.params;

  //* Change state in adoption process to "a" (accepted)
  let process;
  try {
    // Fran, esta forma que hicimos no impedía dos cosas: 1. que se vuelva a mandar la aceptación del proceso, y 2. que un proceso cerrado pase a estar aceptado (cuando en realidad solo los procesos pendientes deberían poder aceptarse)... además agregué lo que nos quedó pendiente: que se cierren todos los otros procesos pendientes con la misma mascota que se acaba de adoptar
    // await Adoptions.update({ state: "a" }, { where: { id: parseInt(id) } });
    // acceptedProcess = await Adoptions.findOne({ where: { id: parseInt(id) } });
    // if (!acceptedProcess) throw new Error(`This application process does not exist in our database`);

    //* Find process and check wether it is pending or not
    process = await Adoptions.findOne({ where: { id: parseInt(id) } });
    if (!process) throw new Error(`This application process does not exist in our database`);
    if (!(process.dataValues.state === "p")) throw new Error(`This application process has already been resolved`);

    //* Accept process
    await process.update({ state: "a" });

    //* Close all other pending adoption processes with the same pet
    await Adoptions.update({ state: "c" }, { where: { PetId: parseInt(process.dataValues.PetId), state: "p" } });

    res.status(200).json(process);
  } catch (error) {
    res.status(409).send(error.message);
  }
};

module.exports = putAcceptAdoption;
