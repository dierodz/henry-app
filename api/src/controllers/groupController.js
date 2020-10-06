const { Group } = require("../db");
const { getUserById } = require("./userController");

// StudentId puede ser un Id o un Array de Ids
const createGrup = async ({ name, type, instructorId, studentId }) => {
   type = type.trim().toLowerCase();

   let users = [];
   const group = await Group.create({ name, type });
   const instructor = await getUserById(instructorId);

   if (studentId) {
      if (Array.isArray(studentId)) {
         users = studentId.forEach(async (id) => {
            return await getUserById(id);
         });

         users = Promise.all(users);
      } else {
         users.push(await getUserById(studentId));
      }
   }

   await group.addUser(instructor, { through: { role: "instructor" } });
   await group.addUsers(users, { through: { role: "student" } });
};

const editGrup = async (id, { name, type }) => {
   const group = getOneGrup({ id });
   return await group.update({ name, type });
};

const deleteGrup = async ({ id, name }) => {
   const group = getOneGrup({ id, name });
   await group.destroy();

   return { message: "successfully removed" };
};

const getOneGrup = async ({ id, name }) => {
   const where = {};
   if (id) where.id = id;
   if (name) where.name = name;

   const group = await Group.findOne({ where });

   if (!group) {
      let message = "";
      if (id) message = `id ${id}`;
      if (name) message = `name ${name}`;

      throw {
         name: "ApiFindError",
         type: "Users Error",
         error: {
            message: `the user with the ${message} does not exist in the database`,
            type: "data not found",
            code: 404,
         },
      };
   }

   return group;
};

const getAllGrups = async () => {
   return await Group.findAll();
};

module.exports = {
   createGrup,
   editGrup,
   deleteGrup,
   getOneGrup,
   getAllGrups,
};
