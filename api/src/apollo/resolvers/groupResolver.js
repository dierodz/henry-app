const {
   getOneGrup,
   getAllGrups,
   editGrup,
   deleteGrup: deleteOneGrup,
   createGrup: createoneGrup,
   removeUsersOfGroups: removeUsers,
   addUsersToGroups: addUsers,
} = require("../../controllers/groupController");

const groups = async (_, { id, name }) => {
   if (id || name) {
      const result = await getOneGrup({ id, name });
      return [result];
   } else return await getAllGrups();
};

const groupResolver = {
   createGroup: async (_, { input }) => {
      return await createoneGrup({ ...input });
   },

   updateGroup: async (_, { id, name, type }) => {
      return await editGrup(id, { name, type });
   },

   deleteGroup: async (_, { id, name }) => {
      return await deleteOneGrup({ id, name });
   },

   removeUsersOfGroups: async (_, { id, name, userId }) => {
      return await removeUsers({ groupId: id, groupName: name, userId });
   },

   addUsersToGroups: async (_, { id, name, input }) => {
      return await addUsers({ groupName: name, groupId: id, ...input });
   },
};

module.exports = {
   groups,
   groupResolver,
};
