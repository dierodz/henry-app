import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import { getUserRol } from "apollo/querys/users";

function Instructors({ className }) {
   const { loading, error, data } = useQuery(getUserRol, {
      variables: { role: "instructor" },
   });
   function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
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
      addButtonLabel: 'Agregar instructor'
   }), [data, error, loading]);
   return (
      <div className={className}>
         <Tabla data={tableData} />
      </div>
   );
}

export default Instructors;
