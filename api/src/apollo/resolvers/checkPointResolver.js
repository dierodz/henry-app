const {
   getAllCheck,
   getOneCheck,
   createCheck,
   editCheck,
   deleteCheck,
} = require("../../controllers/checkPointController");

const checkPoints = async (_, { id, name, where, limit, offset, order }) => {
   if (id || name) {
      const result = await getOneCheck({ id, name });
      return [result];
   } else return await getAllCheck(where, limit, offset, order);
};

const createCheckPoint = async (_, { name }) => {
   return await createCheck(name);
};

const updateCheckPoint = async (_, { id, name }) => {
   return await editCheck(id, { name });
};

const deleteCheckPoint = async (_, { id, name }) => {
   return await deleteCheck({ id, name });
};

module.exports = {
   checkPoints,
   createCheckPoint,
   updateCheckPoint,
   deleteCheckPoint,
};
