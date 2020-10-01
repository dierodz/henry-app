const {PairProgramming} = require("../db");

// Controlador para obtener todos los modulos
const getPairGroups = async()=>{
   const pairGroups = await PairProgramming.findAll()
   if (pairGroups.length < 1) {
      throw {
         name: "ApiFindError",
         type: "Module Error",
         error: {
            message: "there are no Pair Programming Groups in the database",
            type: "data not found",
            code: 404,
         },
      }
     
   }
   return pairGroups;
}

// Controlador para crear un modulo
const createPairGroup = async({name }) => {
  const pairGroup =await PairProgramming.create({ name })
  return pairGroup
   
  
           
};

// Controlador para editar un modulo
const editPairGroup = async(id, name) =>{
   const pairGroup = await PairProgramming.findOne({ where: { id } });
   pairGroup.update({name})
   return pairGroup.save()

}

// Controlador para obtener un modulo por ID 
const getpairGroupsById = async (id) =>{ 
   const pairGroup = await PairProgramming.findOne({ where: { id } })

   if (!pairGroup) {
      throw{
        error: {
          name: "ApiFindError",
          type: "pairGroup Error",
          errors: [
            {
              message: "pairGroup does not exist in the database",
              type: "not found",
              value: null,
            },
          ],
        },
      };
    }
    return pairGroup;
}

// Controlador para eliminar un modulo
const deletePairGroup = async (id) => {
   const pairGroup = await PairProgramming.findOne({ where: { id } });
   await pairGroup.destroy();

   return { message: "successfully removed" };
};


module.exports ={
   getPairGroups,
   createPairGroup,
   deletePairGroup,
   editPairGroup,
   getpairGroupsById
}
