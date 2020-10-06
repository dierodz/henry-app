import React, { useEffect, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import { getUserRol } from "apollo/querys/users";

function Alumns({ className }) {
   const { loading, error, data } = useQuery(getUserRol, {
      variables: { role: "student" },
   });

   useEffect(() => {
      console.log(loading, error, data)
   }, [loading, error, data])

   const tableData = useMemo(() => ({
      loading,
      error,
      data: data ? data.getUserRol : undefined,
      columns: [
         { key: 'givenName', label: 'Nombre', align: 'left' },
         { key: 'familyName', label: 'Apellido', align: 'left' },
         { key: 'cohorte', label: 'Cohorte', align: 'left' },
      ],
      addButtonLabel: 'Agregar alumnos'
   }), [data, error, loading]);

   return (
      <div className={className}>
         <Tabla data={tableData} />
      </div>
   );
}

export default Alumns;
