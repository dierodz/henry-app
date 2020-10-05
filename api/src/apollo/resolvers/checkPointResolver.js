const {
   getAllCheck,
   getOneCheck,
} = require("../../controllers/checkPointController");

const checkPoints = async (_, { id, name }) => {
   if (id || name) {
      const result = await getOneCheck({ id, name });
      return [result];
   } else return await getAllCheck();
};

module.exports = { checkPoints };
