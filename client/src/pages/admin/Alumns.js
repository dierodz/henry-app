import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import COHORTES from "apollo/querys/cohortes";

function Alumns({ className }) {
   const { loading, error, data } = useQuery(COHORTES);

   const tableData = useMemo(() => ({
      loading,
      error,
      data: data ? data.cohortes : undefined,
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
