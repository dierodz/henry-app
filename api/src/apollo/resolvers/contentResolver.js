const {
   createContent,
   updateTopic,
   deleteTopic,
   getAllTopics,
   getOneTopic

} = require("../../controllers/contentController");

const contents = async (_, { id, topicName }) => {
   if (id || topicName) {
      const result = await getOneTopic(id);
      return [result];
   } else return await getAllTopics();
};
const createContenido = async (_, { topicName,durationTime }) => {
   return await createContent({topicName,durationTime});
};

const updateTopics = async (_, { id, topic }) => {
   return await updateTopic(id, { topic });
};

const deleteTopics = async (_, { id }) => {
   return await deleteTopic({ id });
};


module.exports = { 
   contents,
   createContenido,
   updateTopics,
   deleteTopics,
};
