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

const createGroup = async (_, { input }) => {
   return await createoneGrup({ ...input });
};

const updateGroup = async (_, { id, name, type }) => {
   return await editGrup(id, { name, type });
};

const deleteGroup = async (_, { id, name }) => {
   return await deleteOneGrup({ id, name });
};

const removeUsersOfGroups = async (_, { id, name, userId }) => {
   return await removeUsers({ groupId: id, groupName: name, userId });
};

const addUsersToGroups = async (_, { id, name, input }) => {   
   return await addUsers({ groupName: name, groupId: id, ...input });
};

module.exports = {
   groups,
   createGroup,
   updateGroup,
   deleteGroup,
   removeUsersOfGroups,
   addUsersToGroups,
};
