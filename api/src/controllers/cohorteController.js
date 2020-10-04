const { Cohorte } = require("../db");

const createCohorte = async ({
    name,
    number
 }) => {
    let cohorte = await Cohorte.create({name,number})
    

    return cohorte

 };

 const deleteCohorteById =  async(id) => {
    const cohorteId = await Cohorte.findOne({where: {id}})
    
    await cohorteId.destroy()

 }

const upDateCohorte = async (id, name,number) => {
   const cohorte = await Cohorte.findOne({ where: { id } });

   return await cohorte.update({
      name,
      number
   });
};



const getAllCohortes = async () => {
   const cohorte = await Cohorte.findAll({ raw: true });

   return cohorte;
}

const getEspecificCohorte = async (id) => {
   const cohorte = await Cohorte.findOne({ where: { id } });

   const copyCohorte = {...cohorte}

   delete cohorte.createdAt
   delete cohorte.updatedAt

   return copyCohorte.dataValues
}




module.exports = {
    createCohorte,
    deleteCohorteById,
    upDateCohorte,
    getAllCohortes,
    getEspecificCohorte
 };