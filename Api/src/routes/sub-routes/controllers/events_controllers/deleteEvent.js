const { Events } = require("../../../../db");

const deleteEventDB = async id => {
  const event = await Events.findOne({ where: { id } });
  if (!event) throw new Error(`Event does not exist`);
  await Events.destroy({ where: { id } });
  return event;
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    let response = await deleteEventDB(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(409).send(error.message);
  }
};

module.exports = { deleteEvent, deleteEventDB };
