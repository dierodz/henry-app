module.exports = function (sequelize, DataTypes) {
    const Cohortes = sequelize.define('cohortes', {
        cohorteName:{
            type: DataTypes.STRING,
            unique: true,
        },
        cohorteNumber:{
            type: DataTypes.INTEGER,
            unique: true,
        }
    })
    return Cohortes
}