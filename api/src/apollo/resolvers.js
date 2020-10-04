const {
   getAllUsers,
   getUserById,
   createUser,
} = require("../controllers/userController.js");

const resolvers = {
   Query: {
      users: async (_, { id }) => {
         if (id) {
            const result = await getUserById(id);
            return [result];
         } else return await getAllUsers();
      },
   },

   Mutations: {
      createUser: async (_, user) => {
         return await createUser(user);
      },
   },
};

module.exports = resolvers;
