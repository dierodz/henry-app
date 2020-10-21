const {      
   createPost: create,
   getPost: returnPost,
   getCohortePosts: cohortePosts,
   editPost: updatePost,
   deletePost: removePost,
   getAllPosts: returnAllPosts,
   getUserPosts: returnUserPosts,
   getGroupPosts: returnGroupPosts,
} = require("../../controllers/postController");

// Crea un post en la base de datos
const createPost = async (_, { tittle, content, userId, cohorteId, groupId}) => {   
   const post = await create({ tittle, content, userId, cohorteId, groupId });   
   return post;
};

// Optiene un post por id o optiene todos
const getPost = async (_, { id }) => {
   if (id) {
      const result = await returnPost(id);
      return [result];
   } else return await returnAllPosts();
};

// Optiene los post según cohorte
const getCohortePosts = async (_, {cohorteId}) => {
    const posts = await createPost(cohorteId)
    return posts;
}

// Edita in post
const editPost = async (_, { id, tittle, content }) => {
   return await updatePost(id, { tittle, content});
};

//Elimina un post
const deletePost = async (_, { id }) => {
   return await removePost(id);
};

// Obtiene los posts por usuario
const getUserPosts = async (_, {userId}) => {
   const posts = await returnUserPosts(userId)
   return posts;
}

const getGroupPosts = async (_, {groupId})=>{
   const posts = await returnGroupPosts(groupId)
   return posts;
}

module.exports = { createPost, getPost , editPost, deletePost, getCohortePosts, getUserPosts, getGroupPosts };  
