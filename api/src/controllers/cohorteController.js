const { Cohorte } = require("../db");

const createCohorte = async ({ name, number }) => {
   let cohorte = await Cohorte.create({ name, number });
   return cohorte;
};

const deleteCohorteById = async (id) => {
   const cohorteId = await getEspecificCohorte(id);
   await cohorteId.destroy();
   return { message: "successfully removed" };
};

const upDateCohorte = async (id, name, number) => {
   const cohorte = await getEspecificCohorte(id);
   return await cohorte.update({
      name,
      number,
   });
};

const getAllCohortes = async () => {
   const cohortes = await Cohorte.findAll();
   return cohortes;
};

const getEspecificCohorte = async (id) => {
   const cohorte = await Cohorte.findOne({ where: { id } });

   if (!cohorte) {
      throw {
         name: "ApiFindError",
         type: "Cohorte Error",
         error: {
            message: `the cohorte with the id ${id} does not exist in the database`,
            type: "data not found",
            code: 404,
         },
      };
   }

   return cohorte;
};

module.exports = {
   createCohorte,
   deleteCohorteById,
   upDateCohorte,
   getAllCohortes,
   getEspecificCohorte,
};
