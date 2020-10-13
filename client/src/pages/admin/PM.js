import React, { useMemo, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import { getUserRol } from "apollo/querys/users";
import { ADD_ROLE } from "apollo/Mutations/role";


function PM({ className }) {

   const { loading, error, data, refetch } = useQuery(getUserRol, {
      variables: { role: "pm" },
   });
   const [addRoleMutation, resultAddRole] = useMutation(ADD_ROLE);

   useEffect(() => {
      if (!resultAddRole.loading && resultAddRole.called) {
         refetch()
      }
   }, [resultAddRole, refetch])


   const tableData = useMemo(() => ({
      loading,
      error,
      data: data ? data.getUserRol : undefined,
      columns: [
         { key: 'givenName', label: 'Nombre', align: 'left' },
         { key: 'familyName', label: 'Apellido', align: 'left' },
         { key: 'cohorte', label: 'Cohorte', align: 'left' },
         { key: 'group', label: 'Grupo', align: 'left' },
      ],
      addButtonLabel: 'Agregar PM',
      actions: {
         create: {
            initialValues: {
               email: undefined,
            },
            inputs: [
               { key: 'email', label: "Email" },
            ],
            onSubmit: async (values) => {
               const data = {
                  variables: {
                     ...values,
                     role: 'pm'
                  }
               }
               await addRoleMutation(data)
            },
            submitButtonLabel: 'Añadir',
            title: 'Añadir PM'
         },
         delete: {
            onSubmit: (id) => alert(id)
         }
      }
   }), [data, error, loading]);

   return (
      <div className={className}>
         <Tabla data={tableData} />
      </div>
   );
}

export default PM;
