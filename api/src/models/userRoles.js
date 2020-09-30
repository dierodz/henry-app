module.exports = function(sequelize, DataTypes){
    const userRoles = sequelize.define('user_roles' , {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true,
        }
    })
}