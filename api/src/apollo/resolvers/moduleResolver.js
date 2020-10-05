const {
   getModulesById,
   getModules,
} = require("../../controllers/modulesController");

const modules = async (_, { id, name }) => {
   if (id || name) {
      const result = await getModulesById({ id, name });
      return [result];
   } else return await getModules();
};

module.exports = { modules };
