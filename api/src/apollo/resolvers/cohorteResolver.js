const {
   getAllCohortes,
   getEspecificCohorte,
   createCohorte: createOneCohorte,
   upDateCohorte: editOneCohorte,
   deleteCohorteById: deleteOneCohorte,
   removeGroupsOfCohorte,
   addUsersToCohorte,
   addGropusToCohorte,
   removeUsersOfCohorte,
} = require("../../controllers/cohorteController");

const cohortes = async (_, { id }) => {
   if (id) {
      const result = await getEspecificCohorte(id);
      return [result];
   } else return await getAllCohortes();
};

const cohorteResolver = {
   createCohorte: async (_, { input }) => {
      return await createOneCohorte({ ...input });
   },

   editCohorte: async (_, { id, name, number, instructor, startDate }) => {
      return await editOneCohorte({ id, name, number, instructor, startDate });
   },

   deleteCohorte: async (_, { id }) => {
      return await deleteOneCohorte(id);
   },

   addGroupsToCohorte: async (_, { cohorteId, groupId }) => {
      return await addGropusToCohorte(cohorteId, groupId);
   },

   removeGroupsFromCohorte: async (_, { cohorteId, groupId }) => {
      return await removeGroupsOfCohorte(cohorteId, groupId);
   },

   addUsersToCohorte: async (_, { cohorteId, userId }) => {
      return await addUsersToCohorte(cohorteId, userId);
   },

   removeUsersFromCohorte: async (_, { cohorteId, userId }) => {
      return await removeUsersOfCohorte(cohorteId, userId);
   },
};

module.exports = { cohortes, cohorteResolver };
