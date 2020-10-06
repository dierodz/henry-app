const {
   cohortes,
   createCohorte,
   editCohorte,
   deleteCohorte,
} = require("./resolvers/cohorteResolver");
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
const { contents } = require("./resolvers/contentResolver");
const {
   modules,
   createModule,
   updateModule,
   deleteModule,
} = require("./resolvers/moduleResolver");
const {
   roles,
   deleteRole,
   updateRole,
   createRole,
} = require("./resolvers/roleResolver");
const {
   scores,
   deleteScore,
   updateScore,
   createScore,
} = require("./resolvers/scoreResolver");

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
      //Mutations for Cohortes
      createCohorte,
      editCohorte,
      deleteCohorte,
      // Mutations for Users
      createUser,
      updateUser,
      deleteUser,
      // Mutations for CheckPoints
      createCheckPoint,
      updateCheckPoint,
      deleteCheckPoint,
      // Mutations fot Modules
      createModule,
      updateModule,
      deleteModule,
      // Mutations for Roles,
      createRole,
      updateRole,
      deleteRole,
      // Mutaciones de Scores
      createScore,
      updateScore,
      deleteScore,
   },
};

module.exports = resolvers;
