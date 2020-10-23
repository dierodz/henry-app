import { useMutation, useQuery } from "@apollo/client";
import { CREATE_MODULE } from "apollo/Mutations/module";
import { MODULES } from "apollo/querys/modules";
import { Tabla } from "components/Tabla";
import React, { useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";

const ModuleScreen = () => {
  const history = useHistory();

  const { loading, error, data: preData, refetch } = useQuery(MODULES);
  const [createMutation, resultCreate] = useMutation(CREATE_MODULE);

  useEffect(() => {
    if (!resultCreate.loading && resultCreate.called) {
      refetch();
    }
  }, [resultCreate, refetch]);

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
      columns: [{ key: "name", label: "Nombre del Módulo", align: "left" }],
      addButtonLabel: "Agregar Módulo",
      actions: {
        create: {
          initialValues: {
            name: "",
            description: "",
          },
          inputs: [
            { key: "name", label: "Nombre" },
            { key: "description", label: "Descripción" },
          ],
          onSubmit: async (values) => {
            await createMutation({
              variables: {
                ...values,
              },
            });
          },
          submitButtonLabel: "Crear",
          title: "Crear Módulo",
        },

        view: {
          onSubmit: (id) => {
            history.push("/admin/modules/" + id);
          },
        },
      },
    }),
    [createMutation, data, error, history, loading]
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

export default ModuleScreen;
