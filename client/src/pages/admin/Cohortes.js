import React, { useEffect, useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import COHORTES from "apollo/querys/cohortes";
import { CREATE_COHORTE } from "apollo/Mutations/cohortes";

function Cohortes({ className }) {

   const { loading, error, data, refetch } = useQuery(COHORTES);
   const [createMutation, result] = useMutation(CREATE_COHORTE)


   const tableData = useMemo(() => ({
      loading,
      error,
      data: data ? data.cohortes : undefined,
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
               { key: 'startDate', label: "Fecha de inicio" }
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
         }
      }
   }), [data, error, loading, createMutation]);

   useEffect(() => {
      if (!result.loading && result.called) {
         refetch()
      }
   }, [result, refetch])

   return (
      <div className={className}>
         <Tabla data={tableData} />
      </div>
   );
}

export default Cohortes;
