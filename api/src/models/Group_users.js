module.exports = (sequelize, DataTypes) =>{
    return sequelize.define("group_users", {
       rol: {
           type: DataTypes.ENUM('instructor', 'pm', 'student', 'staff')
       }
  })
  };