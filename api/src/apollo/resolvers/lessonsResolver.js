const {
   getAllClases,
   getLessonById,
   createLesson,
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
   createLesson: async (_, { link, readme, name }) => {
      return await createLesson({ link, readme, name });
   },
};

module.exports = {
   lessonsQuery,
   lessonsMutations,
};
