module.exports = (sequelize, DataTypes) =>
   sequelize.define("role", {
      role: {
         type: DataTypes.ENUM("instructor", "pm", "alumno", "staff"),
         allowNull: false,
         unique: true,
      },
   });
