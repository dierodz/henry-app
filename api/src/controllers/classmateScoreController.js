const { MatesScore } = require("../db"); 

const getOneMatesScore = async (id) => {
   
   const score = await MatesScore.findOne({ where: { id }, 
                                           include: { model: MateScoreProvided } });
   console.log(score)

   if (!score) {
      throw {
         name: "ApiFindError",
         name: "score Error",
         error: {
            message: `the score with the name ${id} does not exist in the database`,
            type: "data not found",s
            code: 404,
         },
      };
   }

   return score;
};

const getAllMatesScore = async () => {
   const score = await MatesScore.findAll({ include : MateScoreProvided});

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
   return await MatesScore.create({ name, include: { model: MateScoreProvided} });
};

const editMatesScore = async (id, name) => {
   const score = await MatesScore.findOne({ where: { id }, include: { model: MateScoreProvided} });

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

   return await score.update( type );
};

const deleteMatesScore = async ({ id, name }) => {
   const where = {};
   if (id) where.id = id;
   if (name) where.name = name;

   const score = await MatesScore.findOne({ where });
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
