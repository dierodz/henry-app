const { User, Roles } = require("../db");

const createUser = async ({
   givenName,
   familyName,
   nickName,
   email,
   googleId,
   githubId,
   photoUrl,
   password,
   role,
}) => {
   let user = await User.create({
      givenName,
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

      if (
         role !== "instructor" &&
         role !== "pm" &&
         role !== "alumno" &&
         role !== "staff"
      ) {
         throw {
            error: {
               name: "ApiCreateError",
               type: "Users Error",
               error: {
                  message:
                     "the fields for the role are instructor, pm, alumno and staff",
                  type: "wrong request",
                  code: 400,
               },
            },
         };
      }

      const theRole = await Roles.findOne({ where: { role } });
      await user.setRoles(theRole);
   }

   user = await User.findOne({ where: { id: user.id } });

   const sendUser = { ...user };
   delete sendUser.password;
   delete sendUser.googleId;
   delete sendUser.githubId;

   return sendUser.dataValues;
};

const updateUser = async (id, user) => {
   const userdb = await User.findOne({ where: { id } });
   const {
      givenName,
      familyName,
      nickName,
      email,
      googleId,
      githubId,
      photoUrl,
      password,
      role,
   } = user;

   return await userdb.update({
      givenName,
      familyName,
      nickName,
      email,
      googleId,
      githubId,
      photoUrl,
      password,
      role,
   });
};

const getAllUsers = async () => {
   const users = await User.findAll({ include: [Roles] });
   const copyUsers = [...users];

   if (users.length < 1) {
      throw {
         name: "ApiFindError",
         type: "Users Error",
         error: {
            message: "there are no users in the database",
            type: "data not found",
            code: 404,
         },
      };
   }

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
   const userEmail = await User.findOne({ where: { email } });
   const sendUserEmail = { ...userEmail };
   delete sendUserEmail.password;
   delete sendUserEmail.googleId;
   delete sendUserEmail.githubId;

   return sendUserEmail.dataValues;
};

const getUserByGoogleID = async (googleId) => {
   const userGoogle = await User.findOne({ where: { googleId } });
   const googleIdUser = { ...userGoogle };
   delete googleIdUser.password;
   delete googleIdUser.githubId;

   return googleIdUser.dataValues;
};

const getUserByGithubID = async (githubId) => {
   const userGithub = await User.findOne({ where: { githubId } });
   const githubIdUser = { ...userGithub };
   delete githubIdUser.password;
   delete githubIdUser.googleId;

   return githubIdUser.dataValues;
};

const deleteUserById = async (id) => {
   const user = await User.findOne({ where: { id } });
   await user.destroy();

   return { message: "successfully removed" };
};

module.exports = {
   createUser,
   getAllUsers,
   getUserById,
   getUserByEmail,
   getUserByGoogleID,
   getUserByGithubID,
   deleteUserById,
   updateUser,
};
