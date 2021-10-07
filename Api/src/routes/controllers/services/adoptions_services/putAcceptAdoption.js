const { Adoptions } = require('../../../../db');

const putAcceptAdoption = async (req, res) => {
  const { id } = req.params;

  //* Change state in adoption process to "a" (accepted)
  let acceptedProcess;
  try {
    await Adoptions.update({ state: "a" }, { where: { id: parseInt(id) } });
    acceptedProcess = await Adoptions.findOne({ where: { id: parseInt(id) } });
    if (!acceptedProcess) throw new Error(`This application process does not exist in our database`);
    res.status(200).json(acceptedProcess);
  } catch (error) {
    res.status(409).send(error.message);
  }
};

module.exports = putAcceptAdoption;
