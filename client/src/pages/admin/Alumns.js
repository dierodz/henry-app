import React, { useEffect, useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import { getUserRol } from "apollo/querys/users";
import { INVITE_USER } from "apollo/Mutations/users";

function Alumns({ className }) {
   const { loading, error, data, refetch } = useQuery(getUserRol, {
      variables: { role: "student" },
   });
   const [inviteMutation, resultInvite] = useMutation(INVITE_USER)

   useEffect(() => {
      if (!resultInvite.loading && resultInvite.called) {
         refetch()
      }
   }, [resultInvite, refetch])


   const tableData = useMemo(() => ({
      loading,
      error,
      data: data ? data.getUserRol : undefined,
      columns: [
         { key: 'givenName', label: 'Nombre', align: 'left' },
         { key: 'familyName', label: 'Apellido', align: 'left' },
         { key: 'cohorte', label: 'Cohorte', align: 'left' },
      ],
      addButtonLabel: 'Invitar estudiante',
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
                     role: 'student'
                  }
               }
               await inviteMutation(data)
            },
            submitButtonLabel: 'Invitar',
            title: 'Invitar estudiante'
         },
      }
   }), [data, error, loading, inviteMutation]);

   return (
      <div className={className}>
         <Tabla data={tableData} />
      </div>
   );
}

export default Alumns;
