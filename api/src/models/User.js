const bcrypt = require('bcrypt');

module.exports = function (sequelize, Datatypes) {
    const User = sequelize.define('user', {
        givenName: {
            type: Datatypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: false,
            },
            set(value) {
                if (value) {
                    this.setDataValue('givenName', value.trim().toLowerCase())
                }
            },
        },
        familyName: {
            type: Datatypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: false,
            },
            set(value) {
                if (value) {
                    this.setDataValue('familyName', value.trim().toLowerCase())
                }
            },
        },
        nickName: {
            type: Datatypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                notEmpty: false,
            },
            set(value) {
                if (value) {
                    this.setDataValue('nickName', value.trim().toLowerCase())
                }
            },
        },
        email: {
            type: Datatypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: false,
                isEmail: true,

            },

            set(value) {
                if (value) {
                    this.setDataValue('email', value.trim().toLowerCase())
                }
            },
        },
        googleId: {
            type: Datatypes.STRING,
            validate: {
                notEmpty: false,
            },
        },
        githubId: {
            type: Datatypes.STRING,
            validate: {
                notEmpty: false,
            },
        },
        photoUrl: {
            type: Datatypes.STRING,
            validate: {
                notEmpty: false,
            },
        },
        password: {
            type: Datatypes.STRING,
            validate: {
                notEmpty: false,
            },
            set(value) {
                if (value) {
                    const hashedPass = bcrypt.hashSync(value.trim(), 10)
                    this.setDataValue('password', hashedPass)
                }
            },
        }
    })
    User.prototype.compare = function (password) {
        return bcrypt.compareSync(password, this.password)
    }
    return User;
}
