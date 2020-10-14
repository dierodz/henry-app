module.exports = (sequelize, DataTypes) =>
   sequelize.define("lessons", {
      link: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
      },
   });