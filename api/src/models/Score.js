module.exports = (sequelize, DataTypes) =>
   sequelize.define("scores", {
      score: {
         type: DataTypes.FLOAT,
      },
   });
