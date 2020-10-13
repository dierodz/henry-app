const { Role } = require("../db");

const getOneRole = async (id) => {
   
   const role = await Role.findOne({ where: { id } });

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

const createRole = async (name) => {
   return await Role.create({ name });
};

const editRole = async (id, name) => {
   const role = await Role.findOne({ where: { id } });

   if (!role) {
      throw {
         name: "ApiFindError",
         type: "Roles Error",
         error: {
            message: `the role with the id ${id} does not exist in the database`,
            type: "data not found",
            code: 404,
         },
      };
   }

   return await role.update( name );
};

const deleteRole = async ({ id, name }) => {
   const where = {};
   if (id) where.id = id;
   if (name) where.name = name;

   const role = await Role.findOne({ where });
   role.destroy();

   return { message: "successfully removed" };
};

module.exports = {
   getOneRole,
   getAllRoles,
   createRole,
   editRole,
   deleteRole,
};
