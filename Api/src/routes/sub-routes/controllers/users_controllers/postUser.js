const { Users } = require("../../../../db");
const bcrypt = require("bcrypt");

const postUser = async ( req, res) => {
  const {name, mail, phone, direction, password, photo, responsable, dni, description, link_web, link_instagram, link_facebook, link_donaciones, CityId, UsersTypeId} = req.body;

  const encryptedPass = bcrypt.hashSync(password, 10);

    try {
        if(responsable != undefined) {
            const newUser = await Users.create({
                name,
                mail,
                phone,
                direction,
                password: encryptedPass,
                photo,
                responsable,
                /* dni, */
                description,
                link_web,
                link_instagram,
                link_facebook,
                link_donaciones
            })
            /* await newUser.setUserTypeId(UsersTypeId) */
            await newUser.setCity(CityId);
        res.status(200).json(newUser);
        }
        else {
            const newUser = await Users.create({
                name,
                mail,
                phone,
                direction,
                password: encryptedPass,
                /* photo,
                dni,
                link_instagram,
                link_facebook, */
            })
           /*  await newUser.setUserTypeId(UsersTypeId) */
            await newUser.setCity(CityId);
            res.status(200).json(newUser);
        }
    }
    catch (error) {
        res.status(409).send(error);
    }
};
module.exports = postUser;
