const {
   getAllUsers,
   getUserById,
} = require("../../controllers/userController");

const users = async (_, { id }) => {
   if (id) {
      const result = await getUserById(id);
      return [result];
   } else return await getAllUsers();
};

module.exports = { users };
