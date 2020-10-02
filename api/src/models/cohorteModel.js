module.exports = function (sequelize, DataTypes) {
    const Cohortes = sequelize.define('cohortes', {
        Name:{
            type: DataTypes.STRING,
            unique: true,
        },
        Number:{
            type: DataTypes.INTEGER,
            unique: true,
        }
    })
    return Cohortes
}