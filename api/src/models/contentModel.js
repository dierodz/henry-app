module.exports = function (sequelize, DataTypes) {
    const Content = sequelize.define('contenido', {
        topictName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        durationTime: {
            type: DataTypes.INTEGER,
            allowNull:false,
        }
    })
    return Content; 
}