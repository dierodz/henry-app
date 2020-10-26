import { useQuery } from "@apollo/client";
import { MODULES } from "apollo/querys/modules";
import { Tabla } from "components/Tabla";
import React, { useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";

const ModuleStudent = () => {
  const history = useHistory();
  const { id } = useParams();
  const variables = { id: parseInt(id) };

  const { loading, error, data: preData } = useQuery(MODULES, {
    variables,
  });

  

  const data = useMemo(() => {
    if (preData) {
      return preData.modules[0].contents;
    }
  }, [preData]);

  const tableData = useMemo(
    () => ({
      loading,
      error,
      data,
      columns: [
        { key: "topicName", label: "Nombre del contenido", align: "left" },
      ],
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

export default ModuleStudent;