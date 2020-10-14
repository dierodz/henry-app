const { Score } = require("../db");

//-----controlador para crear score-------\\

const createScores = async (score) => {
   const create = Score.create({ score });
   return create;
};

//----------controlador para obtener los scores----\\

const getScores = async () => {
   const scores = await Score.findAll();
   if (scores.length < 1) {
      throw {
         name: "ApiFindError",
         type: "Search Error",
         error: {
            message: "there are no scores in the database",
            type: "data not found",
            code: 404,
         },
      };
   }
   return scores;
};

//--------controlador para obtener un score------------\\
const getScoreById = async (id) => {
   const scoreById = await Score.findOne({ where: { id } });

   if (!scoreById) {
      throw {
         error: {
            name: "ApiFindError",
            type: "Search Error",
            errors: [
               {
                  message: "there is no such score",
                  type: "not found",
                  code: 404,
               },
            ],
         },
      };
   }
   return scoreById;
};

//------------controlador para actualizar una puntuación----------------\\

const updateScore = async (id, score) => {
   const scoreId = await Score.findOne({ where: { id } });

   if (!scoreId) {
      throw {
         error: {
            name: "ApiFindError",
            type: "Search Error",
            errors: [
               {
                  message: "there is no such score, impossible to update",
                  type: "not found",
                  code: 404,
               },
            ],
         },
      };
   }
   scoreId.update({ score });
   const newScore = await scoreId.save();

   return newScore;
};

//--------------controlador para eliminar una puntuación--------------------\\

const deleteScore = async (id) => {
   const score = await Score.findOne({ where: { id } });

   if (!score) {
      throw {
         error: {
            name: "ApiFindError",
            type: "Search Error",
            errors: [
               {
                  message: "there is no such score, impossible to delete",
                  type: "not found",
                  code: 404,
               },
            ],
         },
      };
   }

   await score.destroy();

   return { message: "successfully removed" };
};

module.exports = {
   createScores,
   getScores,
   getScoreById,
   updateScore,
   deleteScore,
};
