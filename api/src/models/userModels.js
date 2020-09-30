const bcrypt =require('bcrypt');

module.exports = function (sequelize, Datatypes) {
    const User = sequelize.define('user', {
        giveName: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false,
            },
            set(value){
                this.setDataValue('giveName', value.trim().toLowerCase())
            },
        },
        familyName: {
            type: Datatypes.STRING,
            allowNull:  false,
            validate: {
                notEmpty: false,
            },
            set(value){
                this.setDataValue('familyName', value.trim().toLowerCase())
            },
        },
        nickName: {
            type: Datatypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: false,
            },
            set(value){
                this.setDataValue('nickName', value.trim().toLowerCase())
            },
        },
        email: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false,
                isEmail: true,
            },
            set(value){
                this.setDataValue('email', value.trim().toLowerCase())
            },
        },
        googleId:{
            type: Datatypes.STRING,
            validate: {
                notEmpty: false,
            },
            set(value){
                this.setDataValue('googleId', value.trim().toLowerCase())
            },
        },
        githubId:{
            type: Datatypes.STRING,
            validate: {
                notEmpty: false,
            },
            set(value){
                this.setDataValue('githubId', value.trim().toLowerCase())
            },
        },
        photoUrl:{
            type: Datatypes.STRING,
            validate: {
                notEmpty: false,
            },
            set(value){
                this.setDataValue('photoUrl', value.trim())
            },
        },
        password: {
            type: Datatypes.STRING,
            validate: {
                notEmpty: false,
            },
            set(value){
                const hashedPass= bcrypt.hashSync(value.trim(),10)
                this.setDataValue('password', hashedPass)
            },
        }
    })
    User.prototype.compare = function(password) {
        return bcrypt.compareSync(password, this.password)
    }
    return User;
}