import React, { useEffect, useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import COHORTES from "apollo/querys/cohortes";
import { CREATE_COHORTE, DELETE_COHORTE, EDIT_COHORTE } from "apollo/Mutations/cohortes";

function Cohortes({ className }) {

   const { loading, error, data: preData, refetch } = useQuery(COHORTES);
   const [createMutation, resultCreate] = useMutation(CREATE_COHORTE)
   const [deleteMutation, resultDelete] = useMutation(DELETE_COHORTE)
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
         { key: 'name', label: 'Nombre del cohorte', align: 'left' },
         { key: 'instructorDisplay', label: 'Instructor', align: 'left' },
         { key: 'groups', label: 'Grupos', align: 'left' },
         { key: 'alumns', label: 'Alumnos', align: 'left' },
      ],
      addButtonLabel: 'Agregar cohorte',
      actions: {
         create: {
            initialValues: {
               name: undefined,
               instructor: undefined,
               startDate: new Date(),
            },
            inputs: [
               { key: 'name', label: "Nombre" },
               { key: 'instructor', label: "Instructor" },
               { key: 'startDate', label: "Fecha de inicio", type: 'date' }
            ],
            onSubmit: async (values) => {
               await createMutation({
                  variables: {
                     ...values,
                     instructor: parseInt(values.instructor),
                  }
               })
            },
            submitButtonLabel: 'Crear',
            title: 'Crear cohorte'
         },
         update: {
            inputs: [
               { key: 'name', label: "Nombre" },
               { key: 'instructor', label: "Instructor" },
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
   }), [data, error, loading, createMutation, deleteMutation, updateMutation]);

   useEffect(() => {
      if (!resultCreate.loading && resultCreate.called) {
         refetch()
      }
   }, [resultCreate, refetch])

   useEffect(() => {
      if (!resultUpdate.loading && resultUpdate.called) {
         refetch()
      }
   }, [resultUpdate, refetch])

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
