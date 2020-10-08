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
   } else {
      let result = await getAllCohortes();
      // result = result.reduce((res, { dataValues: field }) => {
      //    res = ([
      //       ...res,
      //       {
      //          ...field,
      //          startDate: field.startDate.toDateString()
      //       }
      //    ])
      //    return res
      // }, [])
      return result
   }
};

const createCohorte = async (_, { name, instructor, startDate }) => {
   return await createOneCohorte({ name, instructor, startDate })
}

const editCohorte = async (_, { id, name, instructor, startDate }) => {
   return await editOneCohorte({ id, name, instructor, startDate })
}

const deleteCohorte = async (_, { id }) => {
   return await deleteOneCohorte(id)
}

module.exports = { cohortes, createCohorte, editCohorte, deleteCohorte };
