module.exports = (sequelize, DataTypes) =>{
   return sequelize.define("pair_prog", {
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
   
    }
 })
 };
 