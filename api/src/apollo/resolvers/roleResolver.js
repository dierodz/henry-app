const {
   getAllRoles,
   getOneRole,
   createRole: createOneRole,
   deleteRole: deleteOneRole,
   editRole,
} = require("../../controllers/roleController");

const roles = async (_, { name }) => {
   if (name) {
      const result = await getOneRole(name);
      return [result];
   } else return await getAllRoles();
};

const createRole = async (_, { name }) => {
   return await createOneRole(name);
};

const updateRole = async (_, { id, name }) => {
   return await editRole(id, name);
};

const deleteRole = async (_, { id, name }) => {
   return await deleteOneRole({ id, name });
};

module.exports = { roles, createRole, updateRole, deleteRole };
