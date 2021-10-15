const { Events } = require('../../../../db');

async function putEvent(req, res) {
  const { id } = req.params;
  const { name, description, initDate, endDate, direction, CityId, lat, lng } = req.body;

  try {
    await Events.update({ name, description, initDate, endDate, direction, CityId, lat, lng }, { where: { id: parseInt(id) } });
    const event = await Events.findOne({ where: { id: parseInt(id) } });
    res.status(200).json(event);
  } catch (error) {
    res.status(409).send(error.message);
  }
}

module.exports = putEvent;
