import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";

// import { MODULES } from "apollo/querys/modules";
import { MODULES } from "../alumnos/querys/module";

import { useHistory } from "react-router-dom";

import "styles/components/CohortesDetail.scss";

import { Tabla } from "components/Tabla";

function ModulesDetail({ className }) {
  const { loading, error, data: preData } = useQuery(MODULES);
  const history = useHistory();

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
      columns: [{ key: "name", label: "Nombre del contenido", align: "left" }],
      addButtonLabel: "Agregar contenido",
      actions: {
        create: {
          initialValues: {
            name: undefined,
            readme: undefined,
          },
          inputs: [
            { key: "name", label: "Nombre" },
            { key: "readme", label: "Readme" },
          ],
          onSubmit: async (values) => {
            // await CreateModule({
            //   variables: { ...values },
            // });
            console.log(values);
          },
          submitButtonLabel: "Crear",
          title: "Crear modulo",
        },
        // update: {
        //   inputs: [
        //     { key: "name", label: "Nombre" },
        //     {
        //       key: "instructor",
        //       label: "Instructor",
        //       type: "select",
        //       options: (() => {
        //         return instructors.data?.getUserRol
        //           ? instructors.data.getUserRol.map(
        //               ({ givenName, familyName, id }) => ({
        //                 value: id,
        //                 label: `${givenName} ${familyName}`,
        //               })
        //             )
        //           : [];
        //       })(),
        //     },
        //     { key: "startDate", label: "Fecha de inicio", type: "date" },
        //   ],
        //   onSubmit: async (values) => {
        //     await updateMutation({
        //       variables: {
        //         ...values,
        //         instructor: parseInt(values.instructor),
        //       },
        //     });
        //   },
        //   submitButtonLabel: "Enviar cambios",
        //   title: "Editar cohorte",
        // },
        // delete: {
        //   onSubmit: async (id) => {
        //     await deleteMutation({
        //       variables: {
        //         id: parseInt(id),
        //       },
        //     });
        //   },
        // },
        view: {
          onSubmit: (id) => {
            history.push("/admin/modules/" + id);
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
}

export default ModulesDetail;
