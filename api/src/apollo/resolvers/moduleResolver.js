const {
   getModules,
   createModule: createOneModel,
   deleteModule :deleteModelById,
   editModule,
   getModulesById,
} = require("../../controllers/modulesController");

const modules = async (_, { id, name }) => {
   if (id || name) {
      const result = await getModulesById({ id, name });
      return [result];
   } else return await getModules();
};

const createModule = async (_, { input }) => {
   return await createOneModel({ ...input });
};

const updateModule = async (_, { id, input }) => {
   return await editModule(id, { ...input });
};

const deleteModule = async (_, { id }) => {
   return await deleteModelById(id);
};

module.exports = { modules,createModule , updateModule,deleteModule };
