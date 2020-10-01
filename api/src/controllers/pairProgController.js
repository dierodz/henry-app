const {PairProgramming} = require("../db");

// Controlador para obtener todos los grupos de Pair Programming
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

// Controlador para crear un grupo de Pair Programming
const createPairGroup = async({name }) => {
  const pairGroup =await PairProgramming.create({ name })
  return pairGroup
   
  
           
};

// Controlador para editar un grupo de Pair Programming
const editPairGroup = async(id, name) =>{
   let pairGroup = await PairProgramming.findOne({ where: { id } });
   pairGroup =await pairGroup.update({name})
   return pairGroup.save()

}

// Controlador para obtener un grupo de Pair Programming por ID 
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

// Controlador para eliminar un grupo de Pair Programming
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
