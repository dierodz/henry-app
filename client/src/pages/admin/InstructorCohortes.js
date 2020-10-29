import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import { USER_FULL } from "apollo/querys/users";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

function InstructorCohortes(datos) {
  const { id } = useParams();
  const variables = { id: parseInt(id) };
  const { push } = useHistory();
  const variablesdos = { id: parseInt(datos.datos) };

  const { data: preData, loading, error } = useQuery(
    USER_FULL,
    { variables } || { variablesdos }
  );

  const usercohorte = useMemo(() => {
    if (datos.datos && Array.isArray(preData?.users)) {
      const usuario = preData.users.find((user) => user.id === datos.datos)
        .cohortes;
      return usuario;
    }
  }, [datos.datos, preData]);

  const data = useMemo(() => {
    if (datos.datos) {
      return usercohorte;
    }
    if (Array.isArray(preData?.users)) {
      return preData.users[0].cohortes.map((item) => {
        return {
          ...item,
          name: item.name,
        };
      });
    }
    return preData;
  }, [datos, preData, usercohorte]);

  const tableData = useMemo(
    () => ({
      loading,
      error,
      data: data,
      columns: [
        { key: "name", label: "Nombre del cohorte", align: "left" },
        { key: "id", label: "ID", align: "left" },
      ],
      actions: {
        view: {
          onSubmit: (id) => push(`/admin/cohorte/${id}`),
        },
      },
    }),
    [data, error, loading, push]
  );

  return (
    <div style={{ height: "calc(100vh - 65px)" }}>
      <Tabla data={tableData} />
    </div>
  );
}

export default InstructorCohortes;
