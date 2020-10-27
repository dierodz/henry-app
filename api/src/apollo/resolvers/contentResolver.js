const {
   createContent,
   updateTopic,
   deleteTopic,
   getAllTopics,
   getOneTopic,
} = require("../../controllers/contentController");

const contents = async (_, { id, topicName, where, limit, offset, order }) => {
   if (id || topicName) {
      const result = await getOneTopic({ id });
      return [result];
   } else return await getAllTopics(where, limit, offset, order);
};

const contentMutations = {
   createContent: async (_, { input }) => {
      return await createContent({ ...input });
   },

   updateContent: async (_, { id, input }) => {
      return await updateTopic(id, { ...input });
   },

   deleteContent: async (_, { id }) => {
      return await deleteTopic(id);
   },
};

module.exports = {
   contents,
   contentMutations,
};
