const {
   getAllUsers,
   getUserById,
   createUser: createOneUser,
   updateUser: editUser,
   deleteUserById,
   getUserbyRol,
   setRoleToUser,
   removeRoleToUser,
   inviteOneUser,
   countUsers: dbCount,
} = require("../../controllers/userController");

const userQuerys = {
   users: async (_, { id, where, limit, offset, order }) => {
      if (id) {
         const result = await getUserById(id);
         return [result];
      } else return await getAllUsers({ where, limit, offset, order });
   },
   getUserRol: async (_, { role }) => {
      return await getUserbyRol(role);
   },
   countUsers: async (_, { where }) => {
      return await dbCount({ where });
   },
};

const userMutations = {
   updateUser: async (_, { id, input }) => {
      return await editUser(id, { ...input });
   },

   deleteUser: async (_, { id }) => {
      return await deleteUserById(id);
   },

   inviteUser: async (_, { email, role }) => {
      return await inviteOneUser(email, role);
   },

   createUser: async (_, { input }) => {
      return await createOneUser({ ...input });
   },

   addRoleToUser: async (_, { email, roleName }) => {
      return await setRoleToUser(email, roleName);
   },

   removeRoleToUser: async (_, { email, roleName }) => {
      return await removeRoleToUser(email, roleName);
   },
};

module.exports = {
   userMutations,
   userQuerys,
};
