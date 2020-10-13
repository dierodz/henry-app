import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import { COHORTE_BY_ID } from "apollo/querys/cohortes";
import { useHistory } from "react-router-dom";

function Groups({ className, cohorte }) {
  const { loading, error, data } = useQuery(COHORTE_BY_ID, {
    variables: { id: cohorte.id },
  });

  const { push } = useHistory();

  const tableData = useMemo(
    () => ({
      loading,
      error,
      data: data?.cohortes[0].groups || undefined,
      columns: [
        { key: "name", label: "Nombre", align: "left" },
        { key: "type", label: "Tipo de grupo", align: "left" },
      ],
      addButtonLabel: "Invitar estudiante",
      actions: {
        view: {
          onSubmit: (id) => push(`/group/${id}`),
        },
      },
    }),
    [data, error, loading, push]
  );

  console.log(data?.cohortes[0].users);

  return (
    <div className={className}>
      <div style={{ height: "50vh", width: "100%" }}>
        <Tabla loading={loading} data={tableData} pageSize={5} />
      </div>
    </div>
  );
}

export default Groups;
