import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import COHORTES from "apollo/querys/cohortes";

function Cohortes({ className }) {
   const { loading, error, data } = useQuery(COHORTES);


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
      addButtonLabel: 'Agregar cohorte'
   }), [data, error, loading]);

   return (
      <div className={className}>
         <Tabla data={tableData} />
      </div>
   );
}

export default Cohortes;
