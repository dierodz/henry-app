const { Cohorte } = require("../db");

const createCohorte = async (cohorte) => {
   let result = await Cohorte.create({ ...cohorte });
   return result;
};

const deleteCohorteById = async (id) => {
   const cohorteId = await getEspecificCohorte(id);
   await cohorteId.destroy();
   return { message: "successfully removed" };
};

const upDateCohorte = async (cohorte) => {
   const result = await getEspecificCohorte(cohorte.id);
   try {
      return await result.update({
         ...cohorte,
         startDate: new Date(parseInt(cohorte.startDate))
      });
   } catch (error) {
      console.error(error)
   }
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
