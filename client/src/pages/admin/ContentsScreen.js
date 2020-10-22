import { useMutation, useQuery } from "@apollo/client";
import { CREATE_CONTENT } from "apollo/Mutations/content";
import { MODULES, MODULES_BY_ID } from "apollo/querys/modules";
import { Tabla } from "components/Tabla";
import React, { useEffect, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";

const ContentsScreen = () => {
  const history = useHistory();
  const { id } = useParams();
  const variables = { id: parseInt(id) };

  const modules = useQuery(MODULES);

  const { loading, error, data: preData, refetch } = useQuery(MODULES_BY_ID, {
    variables,
  });

  const [createMutation, resultCreate] = useMutation(CREATE_CONTENT);

  useEffect(() => {
    if (!resultCreate.loading && resultCreate.called) {
      refetch();
    }
  }, [resultCreate, refetch]);

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
      addButtonLabel: "Agregar contenido",
      actions: {
        create: {
          initialValues: {
            topicName: "",
            durationTime: 0,
            readme: "",
            moduleId: 0,
          },
          inputs: [
            { key: "topicName", label: "Nombre" },
            { key: "readme", label: "Readme" },
            { key: "durationTime", label: "Duración" },
            {
              key: "moduleId",
              label: "Módulo",
              type: "select",
              options: (() => {
                return modules?.data?.modules
                  ? modules.data.modules.map(({ name, id }) => ({
                      value: id,
                      label: `${name}`,
                    }))
                  : [];
              })(),
            },
          ],
          onSubmit: async (values) => {
            await createMutation({
              variables: {
                ...values,
                durationTime: parseInt(values.durationTime),
                moduleId: parseInt(values.moduleId),
              },
            });
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
    [createMutation, data, error, history, loading, modules]
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
