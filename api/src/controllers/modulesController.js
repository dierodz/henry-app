const { Module, Content } = require("../db");

// Controlador para obtener todos los modulos
const getModules = async () => {
   const modules = await Module.findAll({
      include: [Content],
      order: [["id", "ASC"]],
   });
   if (modules.length < 1) {
      throw {
         name: "ApiFindError",
         type: "Module Error",
         error: {
            message: "there are no modules in the database",
            type: "data not found",
            code: 404,
         },
      };
   }
   return modules;
};

// Controlador para crear un modulo
const createModule = async ({ name, description }) => {
   const module = await Module.create({ name, description });
   return module;
};

// Controlador para editar un modulo
const editModule = async (id, name, description) => {
   let module = await Module.findOne({ where: { id } });
   module = await module.update({ name, description });
   return module.save();
};

// Controlador para obtener un modulo por ID
const getModulesById = async ({ id, name }) => {
   const where = {};
   if (id) where.id = id;
   if (name) where.name = name;

   const module = await Module.findOne({ where, include: [Content] });

   if (!module) {
      throw {
         error: {
            name: "ApiFindError",
            type: "Module Error",
            errors: [
               {
                  message: "module does not exist in the database",
                  type: "not found",
                  value: null,
               },
            ],
         },
      };
   }
   return module;
};

// Controlador para eliminar un modulo
const deleteModule = async (id) => {
   const module = await Module.findOne({ where: { id } });
   await module.destroy();

   return { message: "successfully removed" };
};

module.exports = {
   getModules,
   createModule,
   deleteModule,
   editModule,
   getModulesById,
};
