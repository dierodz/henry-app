const {
   matesScore,
   deleteMatesScore,
   updateMatesScore,
   createMatesScore,
} = require("./resolvers/mateScoreResolver");
const {
   cohortes,
   createCohorte,
   editCohorte,
   deleteCohorte,
} = require("./resolvers/cohorteResolver");
const {
   users,
   createUser,
   inviteUser,
   updateUser,
   deleteUser,
   getUserRol,
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

const {
   groups,
   createGroup,
   updateGroup,
   deleteGroup,
   removeUsersOfGroups,
   addUsersToGroups,
} = require("./resolvers/groupResolver");

const { getUserById } = require("../controllers/userController");
const {
   getStudentOfGrups,
   getStaffOfGrups,
   getPmsOfGrups,
   getInstructorOfGrups,
} = require("../controllers/groupController");

const resolvers = {
   Query: {
      users,
      checkPoints,
      cohortes,
      contents,
      modules,
      roles,
      scores,
      groups,
      getUserRol,
      matesScore
   },
   Mutation: {
      //Mutations for Cohortes
      createCohorte,
      editCohorte,
      deleteCohorte,
      // Mutations for Users
      createUser,
      inviteUser,
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
      // Mutaciones para groups
      createGroup,
      updateGroup,
      deleteGroup,
      removeUsersOfGroups,
      addUsersToGroups,
      //mutations para mateScores
      deleteMatesScore,
      updateMatesScore,
      createMatesScore,

   },

   Cohorte: {
      instructor: async ({ instructor }) => {
         return await getUserById(instructor);
      },
   },

   Group: {
      instructor: async ({ id }) => {
         return await getInstructorOfGrups(id);
      },

      pms: async ({ id }) => {
         return await getPmsOfGrups(id);
      },

      staff: async ({ id }) => {
         return await getStaffOfGrups(id);
      },

      students: async ({ id }) => {
         return await getStudentOfGrups(id);
      },
   },
};

module.exports = resolvers;
