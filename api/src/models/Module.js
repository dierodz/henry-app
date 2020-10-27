module.exports = (sequelize, DataTypes) => {
   return sequelize.define("module", {
      name: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         validate: {
            notEmpty: false,
         },
         set(value) {
            this.setDataValue("name", value.trim().toLowerCase());
         },
      },
      description: {
         type: DataTypes.TEXT,
      },
   });
};
