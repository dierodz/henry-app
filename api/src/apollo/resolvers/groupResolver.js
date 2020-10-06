const {
   getOneGrup,
   getAllGrups,
   editGrup,
   deleteGrup: deleteOneGrup,
   createGrup: createoneGrup,
} = require("../../controllers/groupController");

const groups = async (_, { id, name }) => {
   if (id || name) {
      const result = await getOneGrup({ id, name });
      return [result];
   } else return await getAllGrups();
};

const createGrup = async (_, { input }) => {
   return await createoneGrup({ ...input });
};

const updateGrup = async (_, { id, input }) => {
   return await editGrup(id, { ...input });
};

const deleteGrup = async (_, { id, name }) => {
   return await deleteOneGrup({ id, name });
};

module.exports = {
   groups,
   createGrup,
   updateGrup,
   deleteGrup,
};
