module.exports = (sequelize, DataTypes) =>{
    return sequelize.define("group_users", {
       role: {
           type: DataTypes.ENUM('instructor', 'pm', 'student', 'staff')
       }
  })
  };
