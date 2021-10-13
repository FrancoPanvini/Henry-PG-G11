const bcrypt = require("bcrypt");

const { Users } = require("../../../../db");
const { deleteUserDB } = require("./deleteUser");

const postUser = async (req, res) => {
  const { name, mail, phone, direction, password, photo, responsable, dni, description, link_web, link_instagram, link_facebook, link_donaciones, Cityid, UsersTypeid, lng, lat } = req.body;

  //* Encrypt password for DB storage
  const encryptedPass = bcrypt.hashSync(password, 10);

  //* Create new User
  let newUser, created;
  try {
    [newUser, created] = await Users.findOrCreate({
      where: { mail: mail.toLowerCase() },
      defaults: {
        name,
        phone,
        direction,
        password: encryptedPass,
        photo,
        responsable,
        dni,
        description,
        link_web,
        link_instagram,
        link_facebook,
        link_donaciones,
        lat,
        lng
      },
    });
    if (!created) throw new Error(`${mail} has allready been use to create a User`);

    //* Set User type
    try {
      await newUser.setUsersType(UsersTypeid);
    } catch (error) {
      throw new Error("Problems setting type of user");
    }

    //* Set City
    try {
      await newUser.setCity(Cityid);
    } catch (error) {
      throw new Error("Problems setting City of user");
    }

    res.status(200).json(newUser);
  } catch (error) {
    if (created) {
      deleteUserDB(newUser.dataValues.id);
    }
    res.status(409).send(error.message);
  }
};

module.exports = postUser;
