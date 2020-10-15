const {      
   createPost: create,
   getPost: returnPost,
   getCohortePosts: cohortePosts,
   editPost: updatePost,
   deletePost: removePost,
   getAllPosts: returnAllPosts,
   getUserPosts: returnUserPosts,
} = require("../../controllers/postController");

// Crea un post en la base de datos
const createPost = async (_, { tittle, content, userId, cohorteId}) => {
   console.log('sí pude llegar')
   console.log(tittle, content, userId, cohorteId)
   const post = await create({ tittle, content, userId, cohorteId });
   console.log(post)
   return post;
};

// Optiene un post por id o optiene todos
const getPost = async (_, { id }) => {
   if (id) {
      const result = await returnPost(id);
      return [result];
   } else return await returnAllPosts();
};

// Edita in post
const editPost = async (_, { id, tittle, content }) => {
   return await updatePost(id, { tittle, content});
};

//Elimina un post
const deletePost = async (_, { id }) => {
   return await deleteMateReview(id);
};


module.exports = { createPost, getPost , editPost, deletePost };  