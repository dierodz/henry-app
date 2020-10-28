import { useQuery } from "@apollo/client";
import { MODULES_BY_ID } from "apollo/querys/modules";
import { Tabla } from "components/Tabla";
import React, { useEffect, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";

const ContentsScreen = () => {
  const history = useHistory();
  const { id } = useParams();
  const variables = { id: parseInt(id) };

  const { loading, error, data: preData, refetch } = useQuery(MODULES_BY_ID, {
    variables,
  });

  const data = useMemo(() => {
    if (preData) {
      return preData.modules[0].contents;
    }
  }, [preData]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const tableData = useMemo(
    () => ({
      loading,
      error,
      data,
      columns: [
        { key: "topicName", label: "Nombre del contenido", align: "left" },
      ],
      addButtonLabel: "Agregar contenido",
      actions: {
        create: {
          onClick: () => {
            history.push("/admin/modules/content/create");
          },

          submitButtonLabel: "Crear",
          title: "Crear contenido",
        },

        view: {
          onSubmit: (id) => {
            history.push("/admin/modules/content/" + id);
          },
        },
      },
    }),
    [data, error, history, loading]
  );

  return (
    <Tabla
      loading={loading}
      data={tableData}
      count={undefined}
      page={1}
      rowsPerPage={4}
      onChangePage={2}
      onChangeRowsPerPage={2}
    />
  );
};

export default ContentsScreen;
