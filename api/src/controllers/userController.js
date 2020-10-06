const { User, Role } = require("../db");

const include = [Role];

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
   roles
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
   if (roles) {
      let dbRoles = []
      for (const specificRol of roles) {
         const dbRole = await Role.findOne({ where: { name: specificRol } })
         dbRoles.push(dbRole)
      }
      await user.setRoles(dbRoles)
   }
   else if (role) {
      role = role.toLowerCase();

      if (
         role !== "instructor" &&
         role !== "pm" &&
         role !== "student" &&
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

      const theRole = await Role.findOne({ where: { name: role } });
      await user.setRoles(theRole);
   } else {
      const theRole = await Role.findOne({ where: { name: "student" } });
      await user.setRoles(theRole);
   }

   return await getUserById(user.id);
};

const getAllUsers = async () => {
   const users = await User.findAll({
      include,
   });

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

   return users;
};

const getUserById = async (id) => {
   const user = await User.findOne({
      where: { id },
      include,
   });

   if (!user) {
      throw {
         name: "ApiFindError",
         type: "Users Error",
         error: {
            message: `the user with the id ${id} does not exist in the database`,
            type: "data not found",
            code: 404,
         },
      };
   }

   return user;
};

const getUserByEmail = async (email) => {
   return await User.findOne({ where: { email }, include });
};

const getUserByGoogleID = async (googleId) => {
   const user = await User.findOne({ where: { googleId } });

   if (!user) {
      if (!user) {
         throw {
            name: "ApiFindError",
            type: "Users Error",
            error: {
               message: `the user with the googleId ${googleId} does not exist in the database`,
               type: "data not found",
               code: 404,
            },
         };
      }
   }

   return await getUserById(user.id);
};

const getUserByGithubID = async (githubId) => {
   const user = await User.findOne({ where: { githubId } });

   if (!user) {
      if (!user) {
         throw {
            name: "ApiFindError",
            type: "Users Error",
            error: {
               message: `the user with the githubId ${githubId} does not exist in the database`,
               type: "data not found",
               code: 404,
            },
         };
      }
   }

   return await getUserById(user.id);
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
      roles
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
   });

   if (roles) {
      let dbRoles = []
      for (const specificRol of roles) {
         const dbRole = await Role.findOne({ where: { name: specificRol } })
         dbRoles.push(dbRole)
      }
      await sendUser.setRoles(dbRoles)
   }
   else if (role) {
      const dbRole = await Role.findOne({ where: { name: role } })

      await sendUser.setRoles(dbRole)
   }

   return await getUserById(sendUser.id);
};

const deleteUserById = async (id) => {
   const user = await User.findOne({ where: { id } });
   await user.destroy();

   return { message: "successfully removed" };
};

const setRolesToUser = async (id, roles) => {
   const user = await getUserById(id);
   const role = await Role.findOne({ where: { name: roles } });

   const updatedUsser = await user.setRoles(role);
   return await getUserById(updatedUsser.id);
};

const _internalGetUserByEmail = async (email) => {
   return await User.findOne({ where: { email } });
};

const getUserbyRol = async (role) => {
   const result =  await Role.findOne({ where: { name: role }, include: [{model: User, include: [Role]}]})
   return result.users
}
module.exports = {
   createUser,
   getAllUsers,
   getUserById,
   getUserByEmail,
   getUserByGoogleID,
   getUserByGithubID,
   deleteUserById,
   updateUser,
   setRolesToUser,
   _internalGetUserByEmail,
   getUserbyRol,
};
