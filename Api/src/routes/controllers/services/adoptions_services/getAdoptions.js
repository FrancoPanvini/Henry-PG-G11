const { where } = require("sequelize");
const { Adoptions, Users } = require("../../../../db");

const getAdoptions = async (req, res) => {
  const { applicant, pet, state, count } = req.query;

  let query = {
    where: {},
    attributes: ["id", "PetId", "UserId", "state", "residence", "residents", "adult", "dedication", "otherPets", "otherPetsDesc", "oldPets", "oldPetsDesc", "createdAt"],
    order: [["createdAt", "ASC"]],
    include: [
      { model: Users, attributes: [] }
    ]
  };

  //* Add filter by applicant
  if (applicant) query.where = { ...query.where, UserId: parseInt(applicant) };

  //* Add filter by pet
  if (pet) query.where = { ...query.where, PetId: parseInt(pet) };

  //* Add filter by state of application
  if (state) query.where = { ...query.where, state: state };

  //* Obtain data from DB
  let adoptions = await Adoptions.findAndCountAll(query);
  if (count === 'true') {
    res.status(200).json({ count: adoptions.count });
  } else {
    res.status(200).json(adoptions.rows);
  }
};

module.exports = getAdoptions;
