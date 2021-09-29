const { Users, Events, Cities} = require("../../../../db")

const getEvents = async (req, res) => {
    const { id } = req.params
    if(id){
        console.log(id)
       let eventid = await Events.findByPk(id)
       res.status(200).json(eventid)
    }
    const query = {
        where:{},
        attributes: ["id", "name","description", "initDate", "endDate", "direction"],
        include: [ 
    {model: Users, attributes: ["name"]},
    {model: Cities, attributes: ["name"]}
    ]
    }
    let events = await Events.findAll(query)
    
    events = events
    .map(event => {
        return {...event.dataValues, User: event.dataValues.User.name, City: event.dataValues.City.name}
    })

    res.status(200).json(events)
}

module.exports = getEvents 
