const { Post, User, Cohorte } = require("../db");
const { getUserById } = require("./userController");


const createPost = async (tittle, content, userId, cohorteId) => {
   console.log(tittle, content, userId, cohorteId)
   const post = await Post.create( tittle, content, userId, cohorteId );
   console.log('Este es el post: ', post)
   return post;
};

// Este controller busca y retorna un post en especifico
const getPost = async (id) => {
   const post = await Post.findAll({where: {id}});
   if (posts.length < 1) {
      throw {
         name: "ApiFindError",
         type: "Search Error",
         error: {
            message: "post do not find in the database",
            type: "data not found",
            code: 404,
         },
      };
   }
   return post;
};


// Este controller busca y retorna los posts de un cohorte en especifico
const getCohortePosts = async (cohorteId) => {
   const posts = await Post.findAll({where: {cohorteId}});
   if (posts.length < 1) {
      throw {
         name: "ApiFindError",
         type: "Search Error",
         error: {
            message: "there are no posts in the database for this cohorte",
            type: "data not found",
            code: 404,
         },
      };
   }
   return posts;
};


// Este controller edita un post
const editPost = async (id, { tittle, content }) => {
   const post = await getPost({ id });
   return await group.update({ tittle, content });
};


// Este controller elimina un post
const deletePost = async (id) => {
   const post = await getPost(id);
   await post.destroy();

   return { message: "successfully removed" };
};

//Este controller retorna todos los posts
const getAllPosts = async () => {
   return await Post.findAll();
};

// Este controller retorna todos los posts que ha hecho una persona
const getUserPosts = async (userId) => {
   const posts = await Post.findAll({where: {userId}})
   if (!post) {
      throw {
         name: "ApiFindError",
         type: "Search Error",
         error: {
            message: "this user does not have posts",
            type: "data not found",
            code: 404,
         },
      };
   }

   return posts
}

module.exports = {
   createPost,
   getPost,
   getCohortePosts,
   editPost,
   deletePost,
   getAllPosts,
   getUserPosts,

  }
