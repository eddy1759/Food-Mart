const {userModel} = require('../model/users')


const validateUser = async(email, password) {
    let user = await userModel.findOne({
        email: email
    }).select('+password')

    if (!user) {
        return false
    }
    const verifyPassword = await user.comparePassword(password, user.password)
    if(!verifyPassword){
        return false
    }
    return user
}

module.exports = validateUser