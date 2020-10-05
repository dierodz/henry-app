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

const createModule = async (_, { name, description}) => {
   return await createOneModel({ name,description });
};

const updateModule = async (_, { id, name, description }) => {
   return await editModule(id, {name, description});
};

const deleteModule = async (_, { id }) => {
   return await deleteModelById(id);
};

module.exports = { modules,createModule , updateModule,deleteModule };
