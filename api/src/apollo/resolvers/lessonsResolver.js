const {
   getAllClases,
   getLessonById,
   createLesson,
   updateLesson: updLesson,
   deleteLesson,
} = require("../../controllers/vimeoController");

const lessonsQuery = {
   lessons: async (_, { id, where, limit, offset, order }) => {
      if (id) {
         return await getLessonById(id);
      }
      return await getAllClases(where, limit, offset, order);
   },
};

const lessonsMutations = {
   createLesson: async (_, { link, contentId }) => {
      return await createLesson({ link, contentId });
   },
   updateLesson: async (_, { id, link }) => {
      return await updLesson({ id, link });
   },
   deleteLesson: async (_, { id }) => {
      return await deleteLesson(id);
   },
};

module.exports = {
   lessonsQuery,
   lessonsMutations,
};
