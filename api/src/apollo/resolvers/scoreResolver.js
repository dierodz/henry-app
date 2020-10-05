const {
   getScores,
   getScoreById,
} = require("../../controllers/scoresController");

const scores = async (_, { id }) => {
   if (id) {
      const result = await getScoreById(id);
      return [result];
   } else return await getScores();
};

module.exports = { scores };
