const {
   getAllCohortes,
   getEspecificCohorte,
   createCohorte: createOneCohorte
} = require("../../controllers/cohorteController");

const cohortes = async (_, { id }) => {
   if (id) {
      const result = await getEspecificCohorte(id);
      return [result];
   } else return await getAllCohortes();
};

const createCohorte = async (_, {name,number}) =>{
   return await createOneCohorte({name,number})
}

module.exports = { cohortes,createCohorte };
