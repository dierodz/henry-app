const { getOneRole } = require("../../controllers/roleController");
const {
   getAllUsers,
   getUserById,
   createUser: createOneUser,
   updateUser: editUser,
   deleteUserById,
   getUserbyRol,
   getUserByEmail,
} = require("../../controllers/userController");
const { sendEmail } = require("../../mailModels/sendEmail");

const users = async (_, { id }) => {
   if (id) {
      const result = await getUserById(id);
      return [result];
   } else return await getAllUsers();
};

const createUser = async (_, { input }) => {
   return await createOneUser({ ...input });
};

const inviteUser = async (_, { email, role: roleName }) => {
   const user = await getUserByEmail(email)
   const role = await getOneRole(roleName)
   if (role) {
      if (user) {
         await user.addRoles(role)
         return user
      } else {
         const user = await createOneUser({ email, role: roleName })
         if (user) {
            await sendEmail({ email }, "userInivitation", roleName)
         }
         return user
      }
   }
   return null
}

const updateUser = async (_, { id, input }) => {
   return await editUser(id, { ...input });
};

const deleteUser = async (_, { id }) => {
   return await deleteUserById(id);
};

const getUserRol = async (_, { role }) => {
   return await getUserbyRol(role)
}

module.exports = { users, createUser, updateUser, deleteUser, getUserRol, inviteUser };
