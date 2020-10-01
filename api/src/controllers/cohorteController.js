const { Cohorte } = require("../db");

const createCohorte = async ({
    cohorteName,
    cohorteNumber
 }) => {
    let cohorte = await Cohorte.create({cohorteName,cohorteNumber})

    return cohorte

 };

 const deleteCohorteById =  async(id) => {
    const cohorteId = await Cohorte.findOne({where: {id}})
    
    await cohorteId.destroy()

 }

const upDateCohorte = async (id, cohorteName,cohorteNumber) => {
   const cohorte = await Cohorte.findOne({ where: { id } });

   return await cohorte.update({
      cohorteName,
      cohorteNumber
   });
};



const getAllCohortes = async () => {
   const cohorte = await Cohorte.findAll({ raw: true });

   return cohorte;
}



module.exports = {
    createCohorte,
    deleteCohorteById,
    upDateCohorte,
    getAllCohortes
 };