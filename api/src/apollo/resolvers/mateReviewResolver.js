const {
   getMateReview,
   createMateReview: createOneReview,
   deleteMateReview: deleteReview,
   editMateReview,
   getMateReviewId,
} = require("../../controllers/mateReviewsController");

const review = async (_, { id, name }) => {
   if (id || name) {
      const result = await getMateReviewId({ id, name });
      return [result];
   } else return await getModules();
};

const createMateReview = async (_, { name, description}) => {
   return await createOneReview({ name,description });
};

const updateReview = async (_, { id, name, description }) => {
   return await editMateReview(id, {name, description});
};

const deleteMateReview = async (_, { id }) => {
   return await deleteReview(id);
};

module.exports = { review, createMateReview , updateReview, deleteMateReview };  