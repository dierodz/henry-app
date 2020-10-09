import React, { useEffect, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import { COHORTE_BY_ID } from "apollo/querys/cohortes";
import { DataGrid } from "@material-ui/data-grid";

function Alumns({ className, cohorte }) {
  const { loading, error, data } = useQuery(COHORTE_BY_ID, {
    variables: { id: cohorte.id },
  });

  // const tableData = useMemo(() => ({
  //   loading,
  //   error,
  //   data: data ? data.getUserRol : undefined,
  //   columns: [
  //     { key: 'givenName', label: 'Nombre', align: 'left' },
  //     { key: 'familyName', label: 'Apellido', align: 'left' },
  //   ],
  //   addButtonLabel: 'Invitar estudiante',
  // }), [data, error, loading]);

  console.log(data?.cohortes[0].users )

  const columns = [
    { field: 'givenName', headerName: 'Nombre' },
    { field: 'familyName', headerName: 'Apellido' },
  ];

  return (
    <div className={className}>
      <div style={{ height: '50vh', width: '100%' }}>
      <DataGrid rows={data?.cohortes ? data?.cohortes[0].users : [] } columns={columns} pageSize={5} />
      </div>
    </div>
  );
}

export default Alumns;