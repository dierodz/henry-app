const { CheckPoint } = require("../db");

const _getOneCheck = async ({ id, name }) => {
   const where = {};

   if (id) where.id = id;
   if (name) where.name = name;

   const check = await CheckPoint.findOne({ where });

   if (check == null) {
      let message = "";
      if (id) message = `id ${id}`;
      if (name) message = `name ${name}`;

      throw {
         name: "ApiFindError",
         type: "CheckPoints Error",
         error: {
            message: `a checkpoint with the ${message} does not exist in the database`,
            type: "wrong request",
            code: 404,
         },
      };
   }

   return check;
};

// Recibe como argumento el nombre del check
const createCheck = async (name) => {
   const check = await CheckPoint.create({ name: name });
   return getOneCheck({ id: check.id });
};

// Recibe un objeto que puede venir con el nombre del check o el id
const getOneCheck = async ({ id, name }) => {
   return await _getOneCheck({ id, name });
};

const getAllCheck = async () => {
   const checks = await CheckPoint.findAll({ order: [["id", "ASC"]] });

   if (checks.length === 0) {
      throw {
         name: "ApiFindError",
         type: "CheckPoints Error",
         error: {
            message: "there are no checkpoints in the database",
            type: "wrong request",
            code: 404,
         },
      };
   }

   return checks;
};

// Recibe como primer argumento el id, y como segundo argumdo argumneot
// Un objeto con las propiedades que se quieren actualizar
const editCheck = async (id, { name }) => {
   let check = await _getOneCheck({ id });
   check = await check.update({ name });

   return getOneCheck({ id: check.id });
};

// Recibe un objeto que puede venir con el nombre o el id
// Lo busca y lo elimina
const deleteCheck = async ({ id, name }) => {
   const check = await _getOneCheck({ id, name });

   await check.destroy();

   return { message: "successfully removed" };
};

module.exports = {
   createCheck,
   editCheck,
   deleteCheck,
   getOneCheck,
   getAllCheck,
};
