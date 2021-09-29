const { Events} = require("../../../../db")

const getEventById = async (req, res) => {
    const { id } = req.params
    console.log(id)
       let eventid = await Events.findAll({where: {id: id}})
       res.status(200).json(eventid)
    
}

module.exports = getEventById