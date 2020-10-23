const { Content, Module } = require("../db");

// Creo topic de la carrera ej: topic: JavaScript 1 | duration: 1 clase
const createContent = async ({ topicName, durationTime, moduleId, readme }) => {
   let topic = await Content.create({
      topicName,
      durationTime,
      readme,
   });
   const module = await Module.findOne({ where: { id: moduleId } });
   await module.addContent(topic);
   return topic;
};

// Modificar nombre o duracion de un topic
const updateTopic = async (id, topic) => {
   const toChange = await Content.findOne({ where: { id } });
   const { topicName, durationTime, readme } = topic;
   return await toChange.update({
      topicName,
      durationTime,
      readme,
   });
};

// Eliminar un topic
const deleteTopic = async (id) => {
   const tobeDeleted = await Content.findOne({ where: { id } });
   await tobeDeleted.destroy();

   return { message: "topic successfully removed" };
};

// Muestra todos los topic que hay en 'x' carrera
const getAllTopics = async () => {
   const topics = await Content.findAll();
   const copytopics = [...topics];

   if (topics.length < 1) {
      throw {
         name: "ApiFindError",
         type: "Topics Error",
         error: {
            message: "there are no topics in the database",
            type: "data not found",
            code: 404,
         },
      };
   }
   return copytopics;
};

const getOneTopic = async ({ id, topicName }) => {
   const topic = await Content.findOne({ where: { id } });

   if (!topic) {
      throw {
         name: "ApiFindError",
         type: "Content Error",
         error: {
            message: `the content with the id ${id} does not exist in the database`,
            type: "data not found",
            code: 404,
         },
      };
   }

   return topic;
};

module.exports = {
   createContent,
   updateTopic,
   deleteTopic,
   getAllTopics,
   getOneTopic,
};
