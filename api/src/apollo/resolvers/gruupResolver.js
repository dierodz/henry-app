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

const createGrup = async (_, { name, type, instructorId, studentId }) => {
   return await createoneGrup({ name, type, instructorId, studentId });
};

const updateGrup = async (_, { id, name, type }) => {
   return await editGrup(id, { name, type });
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
