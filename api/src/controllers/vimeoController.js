const { Lesson } = require("../db");
const { getOneTopic } = require("./contentController");

//Vimeo Api
let Vimeo = require("vimeo").Vimeo;

let client = new Vimeo(
   "cd76cadcc03e452c4fe561aa8401dcbba33d5f1c",
   "UMKTV+hzJ/UjgD6JuFZoIM+HuF9YYRPnNwRl7qVKW0zdI8oSun1pS7fwF+zxbvekxns+DZnnWZ1fb2gJIu1QmfI0OTv20hcFoT1iwp6hcRKlM82vSL5H8ruJulpWdphE",
   "9af52953fb7efad0cd1ce43791d300ce"
);

const AddAllClasesToDb = async () => {
   client.request(
      "https://api.vimeo.com/users/112886970/projects/2174805/videos?per_page=100",
      function (err, json) {
         if (err) {
            return err;
         }
         const obj = json.data;

         for (var i = 0; i < obj.length; i++) {
            Lesson.create({
               link: `https://vimeo.com${obj[i].link}`,
               name: obj[i].name,
            });

            // let content = await getOneTopic({topicName: name: obj[i].name})
         }
      }
   );

   return await getAllClases();
};

const getAllClases = async () => {
   const clases = await Lesson.findAll();
   return clases;
};

const getLessonById = async (id) => {
   const clases = await Lesson.findOne({ where: { id } });
   return clases;
};

const createLesson = async ({ link, contentId }) => {
   const content = await getOneTopic({ id: contentId });
   const lesson = await Lesson.create({ link });

   await content.addLesson(lesson);

   return lesson;
};

const updateLesson = async ({ link, id }) => {
   const lesson = await Lesson.findOne({ where: { id } });

   return await lesson.update({ link });
};

const deleteLesson = async (id) => {
   const lesson = await Lesson.findOne({ where: { id } });

   await lesson.destroy();

   return { message: "Se removio correctamente." };
};

module.exports = {
   // asignarClase,
   AddAllClasesToDb,
   getAllClases,
   getLessonById,
   deleteLesson,
   updateLesson,
   createLesson,
};
