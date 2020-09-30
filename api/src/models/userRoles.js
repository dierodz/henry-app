module.exports = (sequelize, DataTypes) =>
   sequelize.define("user_roles", {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
   });
