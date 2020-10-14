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
            if (value) {
               this.setDataValue("name", value.trim().toLowerCase());
            }
         },
      },
      startDate: {
         type: DataTypes.DATE,
         allowNull: false,
         validate: {
            notEmpty: false,
         },
      },
      instructor: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
   });
   return Cohorte;
};
