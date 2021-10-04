const { Users, Pets, Events } = require("../../../../db");

const deleteUserDB = async id => {
  const user = await Users.findOne({ where: { id } });
  if (!user) throw new Error(`User does not exist`);
  await Events.destroy({ where: { UserId: id } });
  await Pets.destroy({ where: { Ownerid: id } });
  await Users.destroy({ where: { id } });
  return user;
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    let response = await deleteUserDB(id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(409).send(error.message);
  }
};

module.exports = { deleteUser, deleteUserDB };
