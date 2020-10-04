module.exports = (sequelize, DataTypes) =>
   sequelize.define("role", {
      name: {
         type: DataTypes.ENUM("instructor", "pm", "student", "staff"),
         allowNull: false,
         unique: true,
      },
   });
