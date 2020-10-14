const {
   getScores,
   getScoreById,
   createScores,
   deleteScore: deleteOneScore,
   updateScore: updateOneScore,
} = require("../../controllers/scoresController");

const scores = async (_, { id }) => {
   if (id) {
      const result = await getScoreById(id);
      return [result];
   } else return await getScores();
};

const createScore = async (_, { score }) => {
   return await createScores(score);
};

const updateScore = async (_, { id, score }) => {
   return await updateOneScore(id, score);
};

const deleteScore = async (_, { id }) => {
   return await deleteOneScore(id);
};

module.exports = { scores, createScore, updateScore, deleteScore };
