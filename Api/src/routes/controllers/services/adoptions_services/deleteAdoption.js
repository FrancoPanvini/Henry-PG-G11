const { Adoptions } = require('../../../../db');

const deleteAdoptionDB = async id => {
  const adoption = await Adoptions.findOne({ where: { id } });
  if (!adoption) throw new Error(`Process does not exist`);
  await Adoptions.destroy({ where: { id } });
  return adoption;
};

const deleteAdoption = async (req, res) => {
  const { id } = req.params;
  try {
    let response = await deleteAdoptionDB(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(409).send(error.message);
  }
};

module.exports = { deleteAdoption, deleteAdoptionDB };
