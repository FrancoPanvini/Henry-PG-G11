const { Users, Cities, Provinces, Countries, UsersType } = require("../../../../db");

const postUser = async ( req, res) => {
  const {name, mail, phone, direction, password, photo, responsable, dni, description, link_web, link_instagram, link_facebook, link_donaciones, Cityid, UsersTypeId} = req.body;
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
            await newUser.setCity(Cityid)
            await newUser.setUsersType(UsersTypeId)

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
            await newUser.setCity(Cityid)
            await newUser.setUsersType(UsersTypeId)

            res.status(200).json(newUser);
        }
    }
    catch (error) {
        res.status(409).send(error.message);
    }
};
module.exports = postUser;
