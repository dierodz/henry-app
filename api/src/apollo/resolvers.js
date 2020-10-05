const { createUser } = require("../controllers/userController");
const { users } = require("./resolvers/userResolver");
const { checkPoints } = require("./resolvers/checkPointResolver");
const { cohortes,createCohorte } = require("./resolvers/cohorteResolver");
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
      createUser: async (
         _,
         { input }
      ) => {
         return await createUser({ ...input });
      },
      createCohorte
   },
};

module.exports = resolvers;
