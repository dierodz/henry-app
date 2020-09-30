module.exports = function(sequelize, DataTypes){
     userRoles = sequelize.define('user_roles' , {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true,
        }
    })
    return userRoles;
}