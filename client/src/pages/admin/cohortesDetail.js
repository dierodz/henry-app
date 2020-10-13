import React, {useMemo, useEffect} from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import {COHORTE_BY_ID} from "apollo/querys/cohortes";
import { EDIT_COHORTE, ADD_USER_TO_COHORTE, DELETE_USER_TO_COHORTE } from "apollo/Mutations/cohortes";
import { useParams, useRouteMatch } from "react-router-dom";


function CohortesDetail({className}) {

let {id} = useParams()


const [addUsersToCohorteMutation, resultCreate] = useMutation(ADD_USER_TO_COHORTE);
const [deleteUsersToCohorteMutation, resultDelete] = useMutation(DELETE_USER_TO_COHORTE);

 const variables = { variables: id ? id : id }

 const {loading, error, data: preData, refetch}= useQuery(COHORTE_BY_ID, variables);
 
  
   const data = useMemo(() => {
      if (Array.isArray(preData?.cohortes)) {
         return preData.cohortes.map((item) => {
          return item.users.map((user) => {
              return {
               ...user,
               id: user.id,
               givenName: user.givenName,
               familyName: user.familyName
            };
            })
         });
      } else return preData;
   }, [preData]);

console.log(data)

   const tableData = useMemo(
      () => ({
         loading,
         error,
         data: data? data[variables.variables-2] : data,

         columns: [
            { key: "id", label: "id", align: "left" },
            { key: "givenName", label: "Nombre", align: "left" },
            { key: "familyName", label: "Apellido", align: "left" },
            
         ],
         addButtonLabel: "Agregar alumno",
         actions: {
            create: {
               initialValues: {
                  cohorteId: variables.variables,
                  userId: undefined,
               },
               inputs: [{ key: "userId", label: "id", type: "number" }],
               onSubmit: async (values) => {
                 
                   await addUsersToCohorteMutation({
                     variables: {
                        cohorteId: parseInt(values.cohorteId),
                        userId: parseInt(values.userId),
                     }
                  })
               },
               submitButtonLabel: "Agregar",
               title: "Agregar alumno",
            },
            
            delete: {
                                           
               onSubmit: async (userId) => {
               await deleteUsersToCohorteMutation({
                  variables: {
                     cohorteId: parseInt(variables.variables),
                     userId: parseInt(userId),
                  }
               })
             }
            }
         },
      }),
      [data, error, loading, addUsersToCohorteMutation, deleteUsersToCohorteMutation]
   );

   useEffect(() => {
      if (!resultCreate.loading && resultCreate.called) {
         refetch()
      }
   }, [resultCreate, refetch])

      useEffect(() => {
      if (!resultDelete.loading && resultDelete.called) {
         refetch()
      }
   }, [resultDelete, refetch])


   return (
      <div className={className}>
         <Tabla data={tableData} />
      </div>
   );
}

export default CohortesDetail;
