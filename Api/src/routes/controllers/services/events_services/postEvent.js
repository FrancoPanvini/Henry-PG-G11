const { Events } = require("../../../../db");
const { deleteEventDB } = require("./deleteEvent");

const postEvent = async (req, res) => {
  const { name, description, initDate, endDate, direction, Cityid, Userid } = req.body;

  //* Create new Event
  let newEvent, created;
  try {
    [newEvent, created] = await Events.findOrCreate({
      where: { name: name.toLowerCase(), initDate: initDate, UserId: parseInt(Userid), CityId: parseInt(Cityid) },
      defaults: {
        description,
        endDate,
        direction,
      },
    });
    if (!created) throw new Error(`Event allready exist in that date`);

    //* Set User
    try {
      await newEvent.setUser(Userid);
    } catch (error) {
      throw new Error("Problems setting user organizer of the event");
    }

    //* Set City
    try {
      await newEvent.setCity(Cityid);
    } catch (error) {
      throw new Error("Problems setting City of event");
    }

    res.status(200).json(newEvent);
  } catch (error) {
    if (created) {
      deleteEventDB(newEvent?.dataValues.id);
    }
    res.status(409).send(error.message);
  }
};

module.exports = postEvent;
