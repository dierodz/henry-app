const { Scores } = require("../db");

//-----controlador para crear score-------\\ 

const createScores = async (score) => {
	 const create = Scores.create({score})
    return create;
};


//----------controlador para obtener los scores----\\

const getScores = async() => {
   const scores = await Scores.findAll()
   if (scores.length < 1) {
      throw {
         name: "ApiFindError",
         type: "Module Error",
         error: {
            message: "there are no scores in the database",
            type: "data not found",
            code: 404,
         },
      }
     
   }
   return scores
}

//--------controlador para obtener un score------------\\
const getScoreById = async(id) => {

	const scoreById = await Scores.findOne({ where: {id}})
     
    if (!scoreById) {
      throw{
        error: {
          name: "ApiFindError",
          type: "Module Error",
          errors: [
            {
              message: "there is no such score",
              type: "not found",
              value: null,
            },
          ],
        },
      };
    }
    return scoreById;


}

//------------controlador para actualizar una puntuación----------------\\

const updateScore = async (id, score) => {

	const scoreId = await Scores.findOne({ where: {id}})
	scoreId.update({score});
	newScore  = await scoreId.save();
	

   return newScore;
};

//--------------controlador para eliminar una puntuación--------------------\\


const deleteScore = async (id) => {
   const score = await Scores.findOne({ where: { id } });
   await score.destroy();

   return { message: "successfully removed" };
};












module.exports = {
   createScores,
   getScores,
   getScoreById,
   updateScore,
   deleteScore
}

