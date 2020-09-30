module.exports = function (sequelize, DataTypes) {
    const Cohortes = sequelize.define('cohortes', {
        cohorteName:{
            type: DataTypes.STRING,
        },
        cohorteNumber:{
            type: DataTypes.INTEGER,
        }
    })
    return Cohortes
}