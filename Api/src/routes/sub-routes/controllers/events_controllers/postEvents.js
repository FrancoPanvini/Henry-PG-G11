const { Events } = require("../../../../db");

const postEvents = async (req, res) => {
  const { name, description, initDate, endDate, direction, cityId, UserId } = req.body;
  try {
    let eventCreated = await Events.create({
      name,
      description,
      initDate,
      endDate,
      direction,
    });
    await eventCreated.setUser(req.body.UserId);
    await eventCreated.setCity(cityId);
    res.status(200).send("UserId");
  } catch (err) {
    res.status(409).send(err);
  }
};

module.exports = postEvents;
