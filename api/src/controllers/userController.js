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

const getUserByEmail = async (email) => {
   const userEmail = User.findOne({ where: { email } });
   const sendUserEmail = { ...userEmail };
   delete sendUserEmail.password;
   delete sendUserEmail.googleId;
   delete sendUserEmail.githubId;

   return sendUserEmail.dataValues;
};
const getByGoogleID = async (googleId) => {
   const userGoogle = User.findOne({ where: { googleId } });
   const googleIdUser = { ...userGoogle };
   delete googleIdUser.password;
   delete googleIdUser.googleId;
   delete googleIdUser.githubId;

   return googleIdUser.dataValues;
};
const getBygithubID = async (githubId) => {
   const userGithub = User.findOne({ where: { githubId } });
   const githubIdUser = { ...userGithub };
   delete githubIdUser.password;
   delete githubIdUser.googleId;
   delete githubIdUser.githubId;

   return githubIdUser.dataValues;
};

module.exports = {
   createUser,
   getAllUsers,
   getUserById,
   getUserByEmail,
   getByGoogleID,
   getBygithubID,
};
