const {
   getAllCohortes,
   getEspecificCohorte,
} = require("../../controllers/cohorteController");

const cohortes = async (_, { id }) => {
   if (id) {
      const result = await getEspecificCohorte(id);
      return [result];
   } else return await getAllCohortes();
};

module.exports = { cohortes };
