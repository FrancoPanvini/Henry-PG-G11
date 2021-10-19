const { Users } = require("../../../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const newPassword = async (req, res) => {
    try {

    const { password } = req.body;
    const resetToken = req.headers.reset;

    if(!resetToken && password){
        return res.status(409).json({message: 'Fill all the fields'})
    }
    jwtPayload = jwt.verify(resetToken, "jwt-secret")
    const user = await Users.findOne({
        where:{resetToken: resetToken}
    })
    if(!user) {
        return res.status(409).json({messaage: 'There has been an error validating the user'})
    }else{
        const hashed = await bcrypt.hash(password, 10)
        const update = await user.update({
            ...user,
            password: hashed,
            resetToken: null
        })
        return res.json({
            message: 'Password reset ok'
        })
    }
} catch (err) {
    return res.status(409).json({
        message: err,
    })
}
}

module.exports = newPassword