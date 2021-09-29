const { Users } = require("../../../../db");
const { Op } = require("sequelize");

const getAllShelters = async ( req, res) => {

    //const {filters} = req.body
    
    const query = {
        where: {responsable:{[Op.not]:null}},
        attributes: ["id", "name", "mail", "phone", "direction", "password", "photo", "responsable", "dni", "description", "link_web", "link_instagram", "link_facebook", "link_donaciones"],
        include: [
          /* { model: Cities }, */
          /* { model: Pets }, */
          /* { model: Events }, */
        ],
      };
    try {
        const user = await Users.findAll(query)
        res.json(user)
    }
    catch (error) {
      res.status(400).send(error.message);
  }
    
  
  };
  
  module.exports = getAllShelters;