module.exports = (sequelize, DataTypes) =>
   sequelize.define("ratings", {
      score: {
         type: DataTypes.INTEGER,
      },
   });