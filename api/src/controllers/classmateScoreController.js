const { MatesScoreType } = require("../db");

const getOneMatesScore = async (id) => {
   const score = await MatesScoreType.findOne({ where: { id } });

   if (!score) {
      throw {
         name: "score Error",
         error: {
            message: `the score with the name ${id} does not exist in the database`,
            type: "data not found",
            code: 404,
         },
      };
   }

   return score;
};

const getAllMatesScore = async () => {
   const score = await MatesScoreType.findAll();

   if (score.length < 1) {
      throw {
         name: "ApiFindError",
         type: "score Error",
         error: {
            message: "there are no score in the database",
            type: "data not found",
            code: 404,
         },
      };
   }

   return score;
};

const createMatesScore = async (name) => {
   return await MatesScoreType.create({ name });
};

const editMatesScore = async (id, name) => {
   const score = await MatesScoreType.findOne({ where: { id } });

   if (!score) {
      throw {
         name: "ApiFindError",
         type: "score Error",
         error: {
            message: `the score with the id ${id} does not exist in the database`,
            type: "data not found",
            code: 404,
         },
      };
   }

   return await score.update(name);
};

const deleteMatesScore = async ({ id, name }) => {
   const where = {};
   if (id) where.id = id;
   if (name) where.name = name;

   const score = await MatesScoreType.findOne({ where });
   score.destroy();

   return { message: "successfully removed" };
};

module.exports = {
   getOneMatesScore,
   getAllMatesScore,
   createMatesScore,
   editMatesScore,
   deleteMatesScore,
};
