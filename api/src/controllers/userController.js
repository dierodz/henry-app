const { User, Role, Cohorte, Group, parseWhere } = require("../db");
const { sendEmail } = require("../mailModels/sendEmail");

const include = [Role, Cohorte, Group];

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
   roles,
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
      let dbRoles = [];
      for (const specificRol of roles) {
         const dbRole = await Role.findOne({ where: { name: specificRol } });
         dbRoles.push(dbRole);
      }
      await user.setRoles(dbRoles);
   } else if (role) {
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

const getAllUsers = async ({ where, limit, offset, order }) => {
   let localInclude = [...include];
   if (where) {
      where = parseWhere(where);
      if (where["Role"]) {
         localInclude[0] = { model: Role, where: parseWhere(where.Role) };
         delete where.Role;
      }
      if (where["Cohorte"]) {
         localInclude[1] = { model: Cohorte, where: parseWhere(where.Cohorte) };
         delete where.Cohorte;
      }
      if (where["Group"]) {
         localInclude[1] = { model: Group, where: parseWhere(where.Group) };
         delete where.Group;
      }
   }
   try {
      const users = await User.findAll({
         where,
         limit,
         offset,
         order,
         include: localInclude,
      });
      return users;
   } catch (error) {
      console.error(error);
   }
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
   return await User.findOne({ where: { email } });
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
      roles,
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
      let dbRoles = [];
      for (const specificRol of roles) {
         const dbRole = await Role.findOne({ where: { name: specificRol } });
         dbRoles.push(dbRole);
      }
      await sendUser.setRoles(dbRoles);
   } else if (role) {
      const dbRole = await Role.findOne({ where: { name: role } });

      await sendUser.addRoles(dbRole);
   }

   return await getUserById(sendUser.id);
};

const deleteUserById = async (id) => {
   const user = await User.findOne({ where: { id } });
   await user.destroy();

   return { message: "successfully removed" };
};

const setRoleToUser = async (email, roles) => {
   const user = await getUserByEmail(email);
   const role = await Role.findOne({ where: { name: roles } });

   await user.addRoles(role);
   return await getUserById(user.id);
};

const removeRoleToUser = async (email, roles) => {
   const user = await getUserByEmail(email);
   const role = await Role.findOne({ where: { name: roles } });

   await user.removeRoles(role);
   return await getUserById(user.id);
};

const _internalGetUserByEmail = async (email) => {
   return await User.findOne({ where: { email } });
};

const getUserbyRol = async (role) => {
   const result = await Role.findOne({
      where: { name: role },
      include: [{ model: User, include }],
   });
   return result.users;
};

const _getMultipleUsers = async (id) => {
   let users = [];

   if (id) {
      if (Array.isArray(id)) {
         users = await id.map(async (id) => {
            id = parseInt(id);
            const user = await getUserById(id);
            return user;
         });

         users = Promise.all(users);
      } else {
         const user = await getUserById(id);
         users = [user];
      }

      return users;
   }

   return [];
};

const inviteOneUser = async (email, role) => {
   let user = await getUserByEmail(email);

   if (!user) {
      user = await createUser({ email, role });
   }

   await setRoleToUser(user.email, role);

   sendEmail({ email }, "userInivitation", role);

   return getUserById(user.id);
};

const countUsers = async ({ where }) => {
   let localInclude = [];
   if (where) {
      where = parseWhere(where);
      if (where["Role"]) {
         localInclude = [
            ...localInclude,
            { model: Role, where: parseWhere(where.Role) },
         ];
         delete where.Role;
      }
      if (where["Cohorte"]) {
         localInclude = [
            ...localInclude,
            { model: Cohorte, where: parseWhere(where.Cohorte) },
         ];
         delete where.Cohorte;
      }
      if (where["Group"]) {
         localInclude = [
            ...localInclude,
            { model: Group, where: parseWhere(where.Group) },
         ];
         delete where.Group;
      }
   }
   const result = await User.count({
      where,
      include: localInclude,
   });
   return result;
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
   setRoleToUser,
   _internalGetUserByEmail,
   getUserbyRol,
   _getMultipleUsers,
   removeRoleToUser,
   inviteOneUser,
   countUsers,
};
