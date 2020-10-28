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
    if (Array.isArray(preData?.modules)) {
      return preData.modules.map((module) => {
        return {
          ...module,
        };
      });
    } else return preData;
  }, [preData]);
 
  const tableData = useMemo(
    () => ({
      loading,
      error,
      data,
      columns: [
        { key: "name", label: "Modulo", align: "left" },
      ],
      actions: {
        view: {
          onSubmit: (id) => {
          history.push("/student/modules/" + id);
          },
        },
      }
    }),
    [data, error, loading, history]
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
