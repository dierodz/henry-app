const {
   getAllCohortes,
   getEspecificCohorte,
   createCohorte: createOneCohorte,
   upDateCohorte: editOneCohorte,
   deleteCohorteById: deleteOneCohorte
} = require("../../controllers/cohorteController");

const cohortes = async (_, { id }) => {
   if (id) {
      const result = await getEspecificCohorte(id);
      return [result];
   } else return await getAllCohortes();
};

const createCohorte = async (_, {name,number, instructor, startDate}) =>{
   return await createOneCohorte({name,number, instructor, startDate})
}

const editCohorte = async(_, {id, name, number,instructor, startDate}) => {
   return await editOneCohorte({id,name,number,instructor, startDate})
}

const deleteCohorte = async(_, {id}) => {
   return await deleteOneCohorte(id)
}

module.exports = { cohortes,createCohorte,editCohorte,deleteCohorte };
