const { where } = require("sequelize");
const { Adoptions } = require("../../../../db");

const getAdoptions = async (req, res) => {
  const { applicant, pet, state } = req.query;

  let query = {
    where: {},
    attributes: ["PetId", "UserId", "state", "residence", "residents", "adult", "dedication", "otherPets", "otherPetsDesc", "oldPets", "oldPetsDesc", "createdAt"],
    order: [["createdAt", "ASC"]],
  };

  //* Add filter by applicant
  if (applicant) query.where = { ...query.where, UserId: parseInt(applicant) };

  //* Add filter by pet
  if (pet) query.where = { ...query.where, PetId: parseInt(pet) };

  //* Add filter by state of application
  if (state) query.where = { ...query.where, state: state };

  //* Obtain data from DB
  let adoptions = await Adoptions.findAll(query);

  res.status(200).json(adoptions);
};

module.exports = getAdoptions;
