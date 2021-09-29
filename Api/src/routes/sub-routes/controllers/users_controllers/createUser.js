const { Users } = require("../../../../db");

const createUser = async ( req, res) => {
  const {name, mail, phone, direction, password, photo, responsable, dni, description, link_web, link_instagram, link_facebook, link_donaciones} = req.body;
  try {
    if(responsable != undefined) {
        const newUser = await Users.create({
            name,
            mail,
            phone,
            direction,
            password,
            photo,
            responsable,
            dni,
            description,
            link_web,
            link_instagram,
            link_facebook,
            link_donaciones
        })
        res.status(200).json(newUser);
    }
    else {
        const newUser = await Users.create({
            name,
            mail,
            phone,
            direction,
            password,
            photo,
            dni,
            link_instagram,
            link_facebook,
        })
        
        res.status(200).json(newUser);
    }
  }
  catch (error) {
    res.status(405).send(error.message);
}
  

};

module.exports = createUser;
