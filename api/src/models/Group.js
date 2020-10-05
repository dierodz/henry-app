module.exports = (sequelize, DataTypes) =>{
   return sequelize.define("group", {
       name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
             notEmpty: false
           },
           set(value) {
             this.setDataValue("name", value.trim().toLowerCase());
           },
       
      },
      typeOf: {
         type: DataTypes.ENUM('PP', 'StandUp', 'General')
      }
 })
 };
 