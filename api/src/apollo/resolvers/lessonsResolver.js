const { getAllClases,AddAllClasesToDb,getLessonById,createLesson } = require("../../controllers/vimeoController");


const lessonsQuery = {
   lessons : async (_, {id}) => {
      if(id){
         return await getLessonById(id)
      }
      return await getAllClases();
    }
}

const lessonsMutations = {
   createLesson : async (_,{link,readme,name}) => {
      return await createLesson({link,readme,name})
   }
}

 module.exports = {
    lessonsQuery,
    lessonsMutations
 };