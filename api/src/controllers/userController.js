const { User, Roles } = require("../db");

const _sendUser = (user) => {
   const sendUser = { ...user };
   delete sendUser.dataValues.password;
   delete sendUser.dataValues.googleId;
   delete sendUser.dataValues.githubId;
   delete sendUser.dataValues.createdAt;
   delete sendUser.dataValues.updatedAt;

   return sendUser.dataValues;
};

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

   return _sendUser(user);
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

   const sendUser = await userdb.update({
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

   return _sendUser(sendUser);
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
      delete user.dataValues.password;
      delete user.dataValues.googleId;
      delete user.dataValues.githubId;
      delete user.dataValues.createdAt;
      delete user.dataValues.updatedAt;
   });

   return copyUsers;
};

const getUserById = async (id) => {
   const user = await User.findOne({ where: { id } });

   return _sendUser(user);
};

const getUserByEmail = async (email) => {
   return await User.findOne({ where: { email } });
};

const getUserByGoogleID = async (googleId) => {
   const user = await User.findOne({ where: { googleId } });
   return _sendUser(user);
};

const getUserByGithubID = async (githubId) => {
   const userGithub = await User.findOne({ where: { githubId } });
   return _sendUser(userGithub);
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
