const {
   getAllUsers,
   getUserById,
   createUser: createOneUser,
   updateUser: editUser,
   deleteUserById,
   getUserbyRol,
} = require("../../controllers/userController");

const users = async (_, { id }) => {
   if (id) {
      const result = await getUserById(id);
      return [result];
   } else return await getAllUsers();
};

const createUser = async (_, { input }) => {
   return await createOneUser({ ...input });
};

const updateUser = async (_, { id, input }) => {
   return await editUser(id, { ...input });
};

const deleteUser = async (_, { id }) => {
   return await deleteUserById(id);
};

const getUserRol = async (_, {role}) => {
   return await getUserbyRol(role)
}

module.exports = { users, createUser, updateUser, deleteUser, getUserRol  };
