const {
   getAllMatesScore,
   getOneMatesScore,
   createMatesScore: createOneMatesScore,
   deleteMatesScore: deleteOneMatesScore,
   editMatesScore,
} = require("../../controllers/classmateScoreController");

const matesScore = async (_, {id} ) => {
   if (id) {
      const result = await getOneMatesScore(id);
      return [result];
   } else return await getAllMatesScore();
};

const createMatesScore = async (_, { name }) => {
   return await createOneMatesScore(name);
};

const updateMatesScore = async (_, { id, name }) => {
   return await editMatesScore(id, {name});
};

const deleteMatesScore = async (_, { id, name }) => {
   return await deleteOneMatesScore({ id, name });
};

module.exports = { matesScore, createMatesScore, updateMatesScore, deleteMatesScore };
