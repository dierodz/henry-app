const {
   users,
   createUser,
   updateUser,
   deleteUser,
} = require("./resolvers/userResolver");
const { checkPoints } = require("./resolvers/checkPointResolver");
const { cohortes } = require("./resolvers/cohorteResolver");
const { contents } = require("./resolvers/contentResolver");
const {  modules,createModule , updateModule,deleteModule  } = require("./resolvers/moduleResolver");
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
      createUser,
      updateUser,
      deleteUser,
      createModule, 
      updateModule,
      deleteModule 
   },
};

module.exports = resolvers;
