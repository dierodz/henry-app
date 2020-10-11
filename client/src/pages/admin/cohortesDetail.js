import React, {useMemo} from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import {COHORTES, COHORTE_BY_ID} from "apollo/querys/cohortes";
import { EDIT_COHORTE } from "apollo/Mutations/cohortes";
import { useParams } from "react-router-dom";

function CohortesDetail({className}) {

const {index} = useParams()

   const {loading, error, data: preData}= useQuery(COHORTE_BY_ID, {
      variables: { id: index},
   });

   const [updateMutation, resultUpdate] = useMutation(EDIT_COHORTE);
  
   const data = useMemo(() => {
      if (Array.isArray(preData?.cohortes)) {
         return preData.cohortes.map((item) => {
            console.log(item.users)
            return {
               ...item,
               id: item.users.id,
               givenName: item.users.givenName,
               familyName: item.users.familyName,
               
            };
         
         });
      } else return preData;
   }, [preData]);

   const tableData = useMemo(
      () => ({
         loading,
         error,
         data: data,
         columns: [
            { key: "id", label: "ID", align: "left" },
            { key: "givenName", label: "Nombre", align: "left" },
            { key: "familyName", label: "Apellido", align: "left" },
            
         ],
         addButtonLabel: "Agregar alumno",
         actions: {
            create: {
               initialValues: {
                  name: undefined,
               },
               inputs: [{ key: "name", label: "Nombre" }],
               onSubmit: async (values) => {
                  console.log("submit");
               },
               submitButtonLabel: "Agregar",
               title: "Agregar alumno",
            },
            update: {
               inputs: [
                  { key: "name", label: "Nombre" },
                 
               ],
               onSubmit: async (values) => {
                  await updateMutation({
                     variables: {
                        ...values,
                        instructor: parseInt(values.instructor),
                     },
                  });
               },
               submitButtonLabel: "Enviar cambios",
               title: "Editar cohorte",
            },
         },
      }),
      [data, error, loading, updateMutation]
   );



   return (
      <div className={className}>
         <Tabla data={tableData} />
      </div>
   );
}

export default CohortesDetail;
