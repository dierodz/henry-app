module.exports = (sequelize, DataTypes) =>{
  return sequelize.define("modules", {
      name: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         validate: {
            notEmpty: false
          },
          set(value) {
            this.setDataValue("address", value.trim().toLowerCase());
          },
      description: {
         type: DataTypes.STRING,
         allowNull: true,

      }
   }
})
};
