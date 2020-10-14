module.exports = (sequelize, DataTypes) => {
   return sequelize.define("group", {
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
      type: {
         type: DataTypes.ENUM('pp', 'standup', 'general')
      },
      parent: {
         type: DataTypes.INTEGER, 
      }
 })
 };
 
