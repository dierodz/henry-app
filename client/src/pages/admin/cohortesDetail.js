import React, { useEffect, useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import COHORTES from "apollo/querys/cohortes";
import { EDIT_COHORTE } from "apollo/Mutations/cohortes";


function CohortesDetail({className}) {
// falta ver como traemos la data. falta la mutations para poder implentar esta tabla.

   const { loading, error, data: preData, refetch } = useQuery(COHORTES);

   const [updateMutation, resultUpdate] = useMutation(EDIT_COHORTE)


   const data = useMemo(() => {
      if (Array.isArray(preData?.cohortes)) {
         return preData.cohortes.map((item) => {
            return {
               ...item,
               instructorDisplay: `${item.instructor.givenName || ''} ${item.instructor.familyName || ''}`,
               instructor: item.instructor.id,
               groups: 0,
               alumns: 0
            }
         })
      } else return preData
   }, [preData])

   const tableData = useMemo(() => ({
      loading,
      error,
      data: data,
      columns: [
         { key: 'name', label: 'Nombre de Usuario', align: 'left' },
         { key: 'instructorDisplay', label: 'Nombre', align: 'left' },
         { key: 'groups', label: 'Apellido', align: 'left' },
         { key: 'pm', label: 'Rol', align: 'left' },
      ],
      actions: {
        
         update: {
            inputs: [
               { key: 'name', label: "Nombre" },
               // {
               //    key: 'instructor', label: "Instructor", type: "select", options: (() => {
               //       return instructors.data?.getUserRol
               //          ? instructors.data.getUserRol.map(({ givenName, familyName, id }) => ({ value: id, label: `${givenName} ${familyName}` }))
               //          : []
               //    })()
               // },
               { key: 'startDate', label: "Fecha de inicio", type: 'date' }
            ],
            onSubmit: async (values) => {
               await updateMutation({
                  variables: {
                     ...values,
                     instructor: parseInt(values.instructor),
                  }
               })
            },
            submitButtonLabel: 'Enviar cambios',
            title: 'Editar cohorte'
         }
         }
        
   }), [data, error, loading, updateMutation]);

   useEffect(() => {
      if (!resultUpdate.loading && resultUpdate.called) {
         refetch()
      }
   }, [resultUpdate, refetch])


   return (
      <div className={className}>
         <Tabla data={tableData} />
      </div>
   );
}



export default CohortesDetail;
