import React, { useEffect, useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import COHORTES from "apollo/querys/cohortes";
import { CREATE_COHORTE, DELETE_COHORTE } from "apollo/Mutations/cohortes";

function Cohortes({ className }) {

   const { loading, error, data: preData, refetch } = useQuery(COHORTES);
   const [createMutation, resultCreate] = useMutation(CREATE_COHORTE)
   const [deleteMutation, resultDelete] = useMutation(DELETE_COHORTE)

   const data = useMemo(() => {
      if (Array.isArray(preData?.cohortes)) {
         return preData.cohortes.map((item) => {
            return {
               ...item,
               instructor: `${item.instructor.givenName || ''} ${item.instructor.familyName || ''}`,
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
         { key: 'name', label: 'Nombre del cohorte', align: 'left' },
         { key: 'instructor', label: 'Instructor', align: 'left' },
         { key: 'groups', label: 'Grupos', align: 'left' },
         { key: 'alumns', label: 'Alumnos', align: 'left' },
      ],
      addButtonLabel: 'Agregar cohorte',
      actions: {
         create: {
            initialValues: {
               name: undefined,
               number: undefined,
               instructor: undefined,
               startDate: '06/10/2020',
            },
            inputs: [
               { key: 'name', label: "Nombre" },
               { key: 'number', label: "Numero" },
               { key: 'instructor', label: "Instructor" },
               { key: 'startDate', label: "Fecha de inicio", type: 'date' }
            ],
            onSubmit: async (values) => {
               await createMutation({
                  variables: {
                     ...values,
                     instructor: parseInt(values.instructor),
                     number: parseInt(values.number)
                  }
               })
            }
         },
         delete: {
            onSubmit: async (id) => {
               await deleteMutation({
                  variables: {
                     id: parseInt(id)
                  }
               })
            }
         }
      }
   }), [data, error, loading, createMutation, deleteMutation]);

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

export default Cohortes;
