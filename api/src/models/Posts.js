//Define el modulo para la creación de posts
module.exports = (sequelize, DataTypes) =>
   sequelize.define("post", {
   	  tittle: {
   	  	type: DataTypes.STRING,

   	  },
      content: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   });
