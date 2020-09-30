module.exports = (sequelize, DataTypes) =>
   sequelize.define("roles", {
      role: {
         type: DataTypes.ENUM("instructor", "pm", "alumno", "staff"),
         allowNull: false,
      },
   });
