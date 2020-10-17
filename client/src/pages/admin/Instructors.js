import React, { useMemo, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import { getUserRol } from "apollo/querys/users";
import { ADD_ROLE } from "apollo/Mutations/role";

function Instructors({ className }) {
   const { loading, error, data, refetch } = useQuery(getUserRol, {
      variables: { role: "instructor" },
   });

   function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

   const [addRoleMutation, resultAddRole] = useMutation(ADD_ROLE);

   useEffect(() => {
      if (!resultAddRole.loading && resultAddRole.called) {
        refetch();
      }
    }, [resultAddRole, refetch]);

   const tableData = useMemo(() => ({
      loading,
      error,
      data: data ? data.getUserRol.map((user)=> {
   return {__typename: user.__typename,
   familyName: capitalizeFirstLetter(user.familyName),
   givenName: capitalizeFirstLetter(user.givenName),
   id: user.id,
   roles: user.roles,
   }
   }) : undefined,
      columns: [
         { key: 'givenName', label: 'Nombre', align: 'left' },
         { key: 'familyName', label: 'Apellido', align: 'left' },
         { key: 'cohortes', label: 'Cohortes', align: 'left' },
      ],
      addButtonLabel: 'Agregar instructor',
      actions: {
         create: {
           initialValues: {
             email: undefined,
           },
           inputs: [{ key: "email", label: "Email" }],
           onSubmit: async (values) => {
             const data = {
               variables: {
                 ...values,
                 roleName: "instructor",
               },
             };
             await addRoleMutation(data);
           },
           submitButtonLabel: "Añadir",
           title: "Añadir Instructor",
         },
         delete: {
           onSubmit: (id) => alert(id),
         },
       },
   }), [addRoleMutation,data, error, loading]);
  
   return (
      <div className={className}>
         <Tabla data={tableData} />
      </div>
   );
}

export default Instructors;
