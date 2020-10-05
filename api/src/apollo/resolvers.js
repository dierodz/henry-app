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
const { cohortes } = require("./resolvers/cohorteResolver");
const { contents } = require("./resolvers/contentResolver");
const { modules } = require("./resolvers/moduleResolver");
const { roles } = require("./resolvers/roleResolver");
const { scores } = require("./resolvers/scoreResolver");

const resolvers = {
   Query: {
      users,
      checkPoints,
      cohortes,
      contents,
      modules,
      roles,
      scores,
   },

   Mutation: {
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
