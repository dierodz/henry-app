const {
   getAllTopics,
   getOneTopic,
} = require("../../controllers/contentController");

const contents = async (_, { id, topicName }) => {
   if (id || topicName) {
      const result = await getOneTopic(id);
      return [result];
   } else return await getAllTopics();
};

module.exports = { contents };
