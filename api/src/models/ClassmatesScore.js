//define el tipo de calificacion que requerimos
//***liderazgo***habilidades tecnicas*** y las que se quiera definir

module.exports = (sequelize, DataTypes) =>
   sequelize.define("mate_score_type", {
      name: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true
      },
   });
