const {
   getMateReview,
   createMateReview,
   deleteMateReview,
   editMateReview,
   getMateReviewId,
} = require("../../controllers/mateReviewsController");

const mateReview = async (_, { id, score, where, limit, offset, order }) => {
   if (id || score) {
      const result = await getMateReviewId({ id, score });
      return [result];
   } else return await getMateReview(where, limit, offset, order);
};

const createReview = async (_, { score, commentary }) => {
   return await createMateReview({ score, commentary });
};

const updateReview = async (_, { id, score, commentary }) => {
   return await editMateReview(id, { score, commentary });
};

const deleteReview = async (_, { id }) => {
   return await deleteMateReview(id);
};

module.exports = { mateReview, createReview, updateReview, deleteReview };
