module.exports = function (sequelize, DataTypes) {
    const Cohorte = sequelize.define('cohorte', {
        name:{
            type: DataTypes.STRING,
            unique: true,
        },
        number:{
            type: DataTypes.INTEGER,
            unique: true,
        }
    })
    return Cohorte
}