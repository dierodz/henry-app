module.exports = (sequelize, DataTypes) =>
   sequelize.define("content", {
      topicName: {
         type: DataTypes.STRING,
      },
      durationTime: {
         type: DataTypes.INTEGER,
      },
      readme:{
         type: DataTypes.TEXT
      },
   });
