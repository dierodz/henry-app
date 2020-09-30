const { User, Roles } = require("../db");

const createUser = async ({
   giveName,
   familyName,
   nickName,
   email,
   googleId,
   githubId,
   photoUrl,
   password,
   role,
}) => {
   try {
      let user = await User.create({
         giveName,
         familyName,
         nickName,
         email,
         googleId,
         githubId,
         photoUrl,
         password,
      });

      if (role) {
         role = role.toLowerCase();
         const theRole = await Roles.findOne({ where: { role } });
         await user.setRoles(theRole);
      }

      user = await User.findOne({ where: { id: user.id } });

      const sendUser = { ...user };
      delete sendUser.password;
      delete sendUser.googleId;
      delete sendUser.githubId;

      return sendUser.dataValues;
   } catch (e) {
      console.log(e);
      return e;
   }
};

const getAllUsers = async () => {
   const users = await User.findAll({ include: [Roles] });
   const copyUsers = [...users];
   copyUsers.forEach((user) => {
      delete user.password;
      delete user.googleId;
      delete user.githubId;
   });

   return copyUsers;
};

const getUserById = async (id) => {
   const userId = await User.findOne({ where: { id } });

   const sendUserId = { ...userId };
   delete sendUserId.password;
   delete sendUserId.googleId;
   delete sendUserId.githubId;

   return sendUserId.dataValues;
};

module.exports = {
   createUser,
   getAllUsers,
   getUserById,
};
