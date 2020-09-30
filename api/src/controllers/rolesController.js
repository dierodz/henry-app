const { Roles } = require('../db')
const { createUser } = require('./userController')

const createRole = (role) => {
    const role = await Roles.create({role})
}
