const { cohortes,createCohorte, editCohorte,deleteCohorte } = require("./resolvers/cohorteResolver");
const {
   users,
   createUser,
   updateUser,
   deleteUser,
} = require("./resolvers/userResolver");
const {
   checkPoints,
   updateCheckPoint,
   deleteCheckPoint,
   createCheckPoint,
} = require("./resolvers/checkPointResolver");

const resolvers = {
   Query: {
      users,
      checkPoints,
      cohortes,
      // contents,
      // modules,
      // roles,
      // scores,
   },
   Mutation: {
      //Mutations for Cohortes
      createCohorte,
      editCohorte,
      deleteCohorte,
      // Mutations for Users
      createUser,
      updateUser,
      deleteUser,

      // Mutations for Checkpoints
      createCheckPoint,
      updateCheckPoint,
      deleteCheckPoint,
   },
};

module.exports = resolvers;
