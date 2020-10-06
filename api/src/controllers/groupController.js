const { Group, User } = require("../db");
const { getUserById } = require("./userController");

const getMultipleUsers = async (id) => {
   let users = [];

   if (id) {
      if (Array.isArray(id)) {
         id.forEach(async (id) => {
            users.push(await getUserById(id));
         });
      } else {
         users.push(await getUserById(id));
      }

      return users;
   }

   return [];
};

// StudentId puede ser un Id o un Array de Ids
const createGrup = async ({
   name,
   type,
   instructorId,
   studentId,
   staffId,
   pmId,
}) => {
   type = type.trim().toLowerCase();

   const group = await Group.create({ name, type });

   const students = await getMultipleUsers(studentId);
   const instructor = await getMultipleUsers(instructorId);
   const pms = await getMultipleUsers(pmId);
   const staff = await getMultipleUsers(staffId);

   if (students.length > 0) {
      await group.addUsers(students, { through: { role: "student" } });
   }

   if (instructor.length > 0) {
      await group.addUsers(instructor, { through: { role: "instructor" } });
   }

   if (pms.length > 0) {
      await group.addUsers(pms, { through: { role: "pm" } });
   }

   if (staff.length > 0) {
      await group.addUsers(staff, { through: { role: "staff" } });
   }

   return await getOneGrup({ id: group.id });
};

const editGrup = async (id, { name, type }) => {
   const group = await getOneGrup({ id });
   return await group.update({ name, type });
};

const deleteGrup = async ({ id, name }) => {
   const group = await getOneGrup({ id, name });
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

const getInstructorOfGrups = async (id) => {
   const group = await Group.findOne({
      where: { id },
      include: [User],
   });

   const instructor = group.users.find((user) => {
      return user.group_users.role === "instructor";
   });

   if (instructor) {
      return await getUserById(instructor.id);
   }

   return []
};

const getPmsOfGrups = async (id) => {
   const group = await Group.findOne({
      where: { id },
      include: [User],
   });

   let pms = [];

   group.users.forEach((user) => {
      if (user.group_users.role === "pm") {
         pms.push(user.id);
      }
   });

   const result = pms.map(async (id) => await getUserById(id));

   if (result.length === 0 || !result) {
      return await Promise.all(result);
   }

   return []
};

const getStaffOfGrups = async (id) => {
   const group = await Group.findOne({
      where: { id },
      include: [User],
   });

   let staff = [];

   group.users.forEach((user) => {
      if (user.group_users.role === "staff") {
         staff.push(user.id);
      }
   });

   const result = staff.map(async (id) => await getUserById(id));

   if (result.length === 0 || !result) {
      return await Promise.all(result);
   }

   return []
};

const getStudentOfGrups = async (id) => {
   const group = await Group.findOne({
      where: { id },
      include: [User],
   });

   let students = [];

   group.users.forEach((user) => {
      if (user.group_users.role === "student") {
         students.push(user.id);
      }
   });

   const result = students.map(async (id) => await getUserById(id));

   return await Promise.all(result);
};

const removeUsersOfGroups = async ({ groupId, groupName, userId }) => {
   const group = await getOneGrup({ id: groupId, name: groupName });
   const users = await getMultipleUsers(userId);

   await group.removeUsers(users);

   return await getOneGrup({ id: group.id });
};

const addUsersToGroups = async ({
   groupId,
   groupName,
   instructorId,
   studentId,
   staffId,
   pmId,
}) => {
   const group = await getOneGrup({ id: groupId, name: groupName });

   if (studentId) {
      const students = await getMultipleUsers(studentId);
      await group.addUsers(students, { through: { role: "student" } });
   }

   if (instructorId) {
      const instructor = await getMultipleUsers(instructorId);
      await group.addUsers(instructor, { through: { role: "instructor" } });
   }

   if (pmId) {
      const pms = await getMultipleUsers(pmId);
      await group.addUsers(pms, { through: { role: "pm" } });
   }

   if (staffId) {
      const staff = await getMultipleUsers(staffId);
      await group.addUsers(staff, { through: { role: "staff" } });
   }

   return await getOneGrup({ id: group.id });
};

module.exports = {
   createGrup,
   editGrup,
   deleteGrup,
   getOneGrup,
   getAllGrups,
   getInstructorOfGrups,
   getPmsOfGrups,
   getStaffOfGrups,
   getStudentOfGrups,
   removeUsersOfGroups,
   addUsersToGroups,
};