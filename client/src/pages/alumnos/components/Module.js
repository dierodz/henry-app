import { useQuery } from "@apollo/client";
import { CONTENTS } from "apollo/querys/contents";
import { Tabla } from "components/Tabla";
import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";

const Contents = () => {
  const { loading, error, data: preData } = useQuery(CONTENTS);
  const history = useHistory();

  const data = useMemo(() => {
    if (Array.isArray(preData?.contents)) {
      return preData.contents.map((content) => {
        return {
          ...content,
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
        { key: "topicName", label: "Nombre del contenido", align: "left" },
      ],
      addButtonLabel: "Agregar contenido",
      actions: {
        create: {
          initialValues: {
            topicName: undefined,
            durationTime: undefined,
            readme: undefined,
            moduleId: undefined,
          },
          inputs: [
            { key: "topicName", label: "Nombre" },
            { key: "readme", label: "Readme" },
            { key: "durationTime", label: "durationTime" },
            { key: "moduleId", label: "moduleId" },
          ],
          onSubmit: async (values) => {
            console.log(values);
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

export default Contents;
