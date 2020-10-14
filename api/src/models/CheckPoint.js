module.exports = (sequelize, DataTypes) =>
   sequelize.define("checkpoint", {
      name: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         validate: {
            notEmpty: false,
         },
         set(value) {
            if (value) {
               this.setDataValue("name", value.trim().toLowerCase());
            }
         },
      },
   });
