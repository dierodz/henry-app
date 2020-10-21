module.exports = (sequelize, DataTypes) =>{
    return sequelize.define("modules", {
        name: {
           type: DataTypes.STRING,
           allowNull: false,
           unique: true,
           validate: {
              notEmpty: false
            },
     }
  })
  };
  