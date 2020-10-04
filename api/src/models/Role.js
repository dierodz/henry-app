module.exports = (sequelize, DataTypes) =>
   sequelize.define("role", {
      role: {
         type: DataTypes.ENUM("instructor", "pm", "student", "staff"),
         allowNull: false,
         unique: true,
      },
   });
