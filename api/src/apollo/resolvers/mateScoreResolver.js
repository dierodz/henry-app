const {
   getAllMatesScores,
   getOneMatesScore,
   createMatesScore: createOneMatesScore,
   deleteMatesScore: deleteOneMatesScore,
   editMatesScore,
} = require("../../controllers/roleController");

const matesScore = async (_, { id }) => {
   if (id) {
      const result = await getOneMatesScore(id);
      return [result];
   } else return await getAllMatesScores();
};

const createMatesScore = async (_, { type }) => {
   return await createOneMatesScore(name);
};

const updateMatesScore = async (_, { id, type }) => {
   return await editMatesScore(id, {name});
};

const deleteMatesScore = async (_, { id, type }) => {
   return await deleteOneMatesScore({ id, type });
};

module.exports = { matesScore, createMatesScore, updateMatesScore, deleteMatesScore };
