const {
   getAllRoles,
   getOneRole,
   createRole: createOneRole,
   deleteRole: deleteOneRole,
   editRole,
} = require("../../controllers/roleController");

const roles = async (_, { id, where, limit, offset, order }) => {
   if (id) {
      const result = await getOneRole(id);
      return [result];
   } else return await getAllRoles(where, limit, offset, order);
};

const createRole = async (_, { name }) => {
   return await createOneRole(name);
};

const updateRole = async (_, { id, name }) => {
   return await editRole(id, { name });
};

const deleteRole = async (_, { id, name }) => {
   return await deleteOneRole({ id, name });
};

module.exports = { roles, createRole, updateRole, deleteRole };
