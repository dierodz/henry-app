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
const { parseWhere } = require("../../db");

const cohortes = async (_, { id, where }) => {
   if (id) {
      const result = await getEspecificCohorte(id);
      return [result];
   } else {
      if (where) where = parseWhere(where);
      let result = await getAllCohortes({ where });
      // result = result.reduce((res, { dataValues: field }) => {
      //    res = ([
      //       ...res,
      //       {
      //          ...field,
      //          startDate: field.startDate.toDateString()
      //       }
      //    ])
      //    return res
      // }, [])
      return result;
   }
};

const cohorteResolver = {
   createCohorte: async (_, { input }) => {
      return await createOneCohorte({ ...input });
   },

   editCohorte: async (_, { input }) => {
      return await editOneCohorte({ ...input });
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
