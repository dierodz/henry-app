const {
   getModules,
   createModule: createOneModel,
   deleteModule: deleteModelById,
   editModule,
   getModulesById,
} = require("../../controllers/modulesController");

const moduleQuerys = {
   modules: async (_, { id, name, where, limit, offset, order }) => {
      if (id || name) {
         const result = await getModulesById({ id, name });
         return [result];
      } else return await getModules(where, limit, offset, order);
   },
};

const moduleMutations = {
   createModule: async (_, { name, description }) => {
      return await createOneModel({ name, description });
   },

   updateModule: async (_, { id, name, description }) => {
      return await editModule(id, { name, description });
   },

   deleteModule: async (_, { id }) => {
      return await deleteModelById(id);
   },
};

module.exports = { moduleQuerys, moduleMutations };
