const { User } = require('../db')

const createUser = async ({ giveName, familyName, nickName, email, googleId, githubId, photoUrl, password}) => {

  try {
    const user = await User.create({giveName, familyName, nickName, email, googleId, githubId, photoUrl, password})

    const sendUser = {...user}
    delete sendUser.password;
    delete sendUser.googleId;
    delete sendUser.githubId;

    return sendUser.dataValues;
  } catch (e) {
    console.log(e)
    return e
  }
  
}

const getAllUsers = async() =>{
    const users = await User.findAll()
    const copyUsers = [...users]
    copyUsers.forEach(user => {
        delete user.password;
        delete user.googleId;
        delete user.githubId;
    })

    return copyUsers;
}

module.exports = {
  createUser,
  getAllUsers
}