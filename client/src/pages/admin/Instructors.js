import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import { getUserRol } from "apollo/querys/users";

function Instructors({ className }) {
   const { loading, error, data } = useQuery(getUserRol, {
      variables: { role: "instructor" },
   });

   const tableData = useMemo(() => ({
      loading,
      error,
      data: data ? data.getUserRol : undefined,
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