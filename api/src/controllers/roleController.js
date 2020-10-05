const { Role } = require("../db");

const getOneRole = async (name) => {
   const role = await Role.findOne({ where: { name } });

   if (!role) {
      throw {
         name: "ApiFindError",
         type: "Roles Error",
         error: {
            message: `the role with the name ${name} does not exist in the database`,
            type: "data not found",
            code: 404,
         },
      };
   }

   return role;
};

const getAllRoles = async () => {
   const roles = await Role.findAll({});

   if (roles.length < 1) {
      throw {
         name: "ApiFindError",
         type: "Roles Error",
         error: {
            message: "there are no roles in the database",
            type: "data not found",
            code: 404,
         },
      };
   }

   return roles;
};

module.exports = {
   getOneRole,
   getAllRoles,
};
