const { MateReview } = require("../db");

// Controlador para obtener todos los modulos

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

// Controlador para crear un modulo
const createMateReview = async ({ score, commentary }) => {
   const review = await MateReview.create({ score, commentary });
   return review;reviewreview
};

// Controlador para editar un modulo
const editMateReview = async (id, score, commentary) => {
   let review = await MateReview.findOne({ where: { id } });
   review = await review.update({ score, commentary });
   return rreview.save();
};

// Controlador para obtener un modulo por ID
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

// Controlador para eliminar un modulo
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
