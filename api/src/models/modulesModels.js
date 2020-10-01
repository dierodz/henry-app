module.exports = (sequelize, DataTypes) =>{
  const Modules = sequelize.define("modules", {
      name: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
      },
      description: {
         type: DataTypes.STRING,
         allowNull: true,

      }
   })
    return Modules;
   };
