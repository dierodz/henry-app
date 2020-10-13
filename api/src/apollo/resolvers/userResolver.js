const {
   getAllUsers,
   getUserById,
   createUser: createOneUser,
   updateUser: editUser,
   deleteUserById,
   getUserbyRol,
   getUserByEmail,
   setRoleToUser,
   removeRoleToUser,
} = require("../../controllers/userController");
const { sendEmail } = require("../../mailModels/sendEmail");

const userQuerys = {
   users: async (_, { id }) => {
      if (id) {
         const result = await getUserById(id);
         return [result];
      } else return await getAllUsers();
   },
   getUserRol: async (_, { role }) => {
      return await getUserbyRol(role);
   },
};

const userMutations = {
   updateUser: async (_, { id, input }) => {
      return await editUser(id, { ...input });
   },

   deleteUser: async (_, { id }) => {
      return await deleteUserById(id);
   },

   inviteUser: async (_, { email, role: roleName }) => {
      const user = await getUserByEmail(email);
      if (user) {
         return user;
      } else {
         const user = await createOneUser({ email, role: roleName });
         if (user) {
            await sendEmail({ email }, "userInivitation", roleName);
         }
         return user;
      }
   },

   createUser: async (_, { input }) => {
      return await createOneUser({ ...input });
   },

   addRoleToUser: async (_, { userId, roleName }) => {
      return await setRoleToUser(userId, roleName);
   },

   removeRoleToUser: async (_, { userId, roleName }) => {
      return await removeRoleToUser(userId, roleName);
   },
};

module.exports = {
   userMutations,
   userQuerys,
};
