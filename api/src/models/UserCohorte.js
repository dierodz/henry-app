module.exports = (sequelize, DataTypes) =>
   sequelize.define("user_cohorte", {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
   });
