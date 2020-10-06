const { cohortes, createCohorte, editCohorte, deleteCohorte } = require("./resolvers/cohorteResolver");
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
const { modules, createModule, updateModule, deleteModule } = require("./resolvers/moduleResolver");
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
      //Mutations for Cohortes
      createCohorte,
      editCohorte,
      deleteCohorte,
      // Mutations for Users
      createUser,
      updateUser,
      deleteUser,
      createCheckPoint,
      updateCheckPoint,
      deleteCheckPoint,
      //createModule,
      //updateModule,
      //deleteModule
   },
};

module.exports = resolvers;
