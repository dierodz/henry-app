module.exports = (sequelize, DataTypes) =>
   sequelize.define("role", {
      name: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
      },
   });
