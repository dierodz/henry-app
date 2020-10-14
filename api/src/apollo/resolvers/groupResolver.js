const {
   getOneGrup,
   getAllGrups,
   editGrup,
   deleteGrup: deleteOneGrup,
   createGrup: createoneGrup,
   removeUsersOfGroups: removeUsers,
   addUsersToGroups: addUsers,
   setParentToGroup,
   countGroups: dbCount,
} = require("../../controllers/groupController");

const countGroups = async (_, { where }) => {
   return await dbCount({ where });
};

const groups = async (_, { id, name, where, limit, offset, order }) => {
   if (id || name) {
      const result = await getOneGrup({
         id,
         name,
         where,
         limit,
         offset,
         order,
      });
      return [result];
   } else return await getAllGrups({ where, limit, offset, order });
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
   setParentToGroup: async (_, { parentId, sonId }) => {
      return await setParentToGroup({ parentId, sonId });
   },
};

module.exports = {
   groupQuerys: { groups, countGroups },
   groupResolver,
};
