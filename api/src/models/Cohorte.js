module.exports = function (sequelize, DataTypes) {
   const Cohorte = sequelize.define("cohorte", {
      name: {
         type: DataTypes.STRING,
         unique: true,
         allowNull: false,
         validate: {
            notEmpty: false,
         },
         set(value) {
            this.setDataValue("name", value.trim().toLowerCase());
         },
      },
      number: {
         type: DataTypes.INTEGER,
         unique: true,
      },
      startDate: {
         type: DataTypes.DATE,
         allowNull: false,
         validate: {
            notEmpty: false,
         },
      },
   });
   return Cohorte;
};
