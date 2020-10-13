const { MateReview } = require("../db");

// Controlador para obtener todas las reviews

const getMateReview = async () => {
   const review = await MateReview.findAll();
   if (review.length < 1) {
      throw {
         name: "ApiFindError",
         type: "Module Error",
         error: {
            message: "there are no review in the database",
            type: "data not found",
            code: 404,
         },
      };
   }
   return review;
};

// Controlador para crear una review
const createMateReview = async ({ score, commentary }) => {
   const review = await MateReview.create({ score, commentary });
   return review;
};

// Controlador para editar una review 
const editMateReview = async (id, score, commentary) => {
   let review = await MateReview.findOne({ where: { id } });
   review = await review.update( score, commentary );
   return review.save();
};

// Controlador para obtener una review por ID
const getMateReviewId = async ({ id, score }) => {
   const where = {};
   if (id) where.id = id;
   if (score) where.score = score;

   const review = await MateReview.findOne({ where });

   if (!module) {
      throw {
         error: {
            name: "ApiFindError",
            type: "Module Error",
            errors: [
               {
                  message: "module does not exist in the database",
                  type: "not found",
                  value: null,
               },
            ],
         },
      };
   }
   return review;
};

// Controlador para eliminar una review
const deleteMateReview = async (id) => {
   const review = await MateReview.findOne({ where: { id } });
   await review.destroy();

   return { message: "successfully removed" };
};

module.exports = {
   getMateReview,
   createMateReview,
   deleteMateReview,
   editMateReview,
   getMateReviewId,
};
