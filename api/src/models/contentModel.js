module.exports = (sequelize, DataTypes) =>
   sequelize.define("content", {
      topictName: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      durationTime: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
   });
