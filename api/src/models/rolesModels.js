module.exports = function(sequelize, DataTypes){
    const Roles = sequelize.define('roles' , {
        role : {
            type: DataTypes.ENUM('instructor','pm','alumno','staff'),
            allowNull: false,
        }
    })
    return Roles;
}