const { PubSub, withFilter } = require("apollo-server-express");
const {
   createPost: create,
   getPost: returnPost,
   editPost: updatePost,
   deletePost: removePost,
   getAllPosts: returnAllPosts,
   getUserPosts: returnUserPosts,
   getGroupPosts: returnGroupPosts,
} = require("../../controllers/postController");

const pubsub = new PubSub();
const POST = "POST";

// Crea un post en la base de datos
const createPost = async (
   _,
   { tittle, content, userId, cohorteId, groupId }
) => {
   const post = await create({ tittle, content, userId, cohorteId, groupId });
   pubsub.publish(POST, { subscribePost: post });
   return post;
};

// Optiene un post por id o optiene todos
const getPost = async (_, { id, where, limit, offset, order }) => {
   if (id) {
      const result = await returnPost(id);
      return [result];
   } else return await returnAllPosts({ where, limit, offset, order });
};

const subscribePost = {
   subscribe: withFilter(
      () => pubsub.asyncIterator(POST),
      (payload, variables) => {
         if (variables.cohorteId)
            return payload.subscribePost.cohorteId === variables.cohorteId;
         else if (variables.groupId)
            return payload.subscribePost.groupId === variables.groupId;
         return true;
      }
   ),
};

// Optiene los post según cohorte
const getCohortePosts = async (_, { cohorteId }) => {
   const posts = await createPost(cohorteId);
   return posts;
};

// Edita in post
const editPost = async (_, { id, tittle, content }) => {
   return await updatePost(id, { tittle, content });
};

//Elimina un post
const deletePost = async (_, { id }) => {
   return await removePost(id);
};

// Obtiene los posts por usuario
const getUserPosts = async (_, { userId }) => {
   const posts = await returnUserPosts(userId);
   return posts;
};

const getGroupPosts = async (_, { groupId }) => {
   const posts = await returnGroupPosts(groupId);
   return posts;
};

module.exports = {
   subscribePost,
   createPost,
   getPost,
   editPost,
   deletePost,
   getCohortePosts,
   getUserPosts,
   getGroupPosts,
};
