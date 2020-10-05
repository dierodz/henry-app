const { getAllRoles, getOneRole } = require("../../controllers/roleController");

const roles = async (_, { name }) => {
   if (name) {
      const result = await getOneRole(name);
      return [result];
   } else return await getAllRoles();
};

module.exports = { roles };
