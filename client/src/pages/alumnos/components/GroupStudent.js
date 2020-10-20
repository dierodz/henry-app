import React, { useEffect, useMemo, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Tabla } from "components/Tabla";
import { useHistory } from "react-router-dom";
import { CREATE_GROUP } from "apollo/Mutations/groups";
import { ADD_GROUP_TO_COHORTE } from "apollo/Mutations/cohortes";
import { GROUPS, COUNT_GROUPS } from "apollo/querys/groups";

function GroupStudent ({
  className,
  cohorte,
  data: componentData,
  loading: componentLoading,
  onRefetch,
}) {
  const [
    execute,
    { loading: queryLoading, error, data: preData, refetch: preRefetch },
  ] = useLazyQuery(GROUPS);

  const [executeCount, { data: count }] = useLazyQuery(COUNT_GROUPS);

  const [createGroup, { loading: createLoading }] = useMutation(CREATE_GROUP);
  const [addGroupToCohorte, { loading: addLoading }] = useMutation(
    ADD_GROUP_TO_COHORTE
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  function onChangePage(_, page) {
    setPage(page);
  }
  function onChangeRowsPerPage(e) {
    setRowsPerPage(e.target.value);
  }

  const variables = useMemo(
    () => ({
      where: cohorte ? { cohorteId: cohorte.id } : undefined,
      limit: rowsPerPage,
      offset: rowsPerPage * page,
    }),
    [rowsPerPage, page, cohorte]
  );

  useEffect(() => {
    if (cohorte) {
      execute({
        variables,
      });
      executeCount({ variables });
    }
  }, [cohorte, execute, executeCount, variables]);

  const loading = useMemo(
    () => queryLoading || componentLoading || createLoading || addLoading,
    [queryLoading, componentLoading, createLoading, addLoading]
  );
  const data = useMemo(
    () => preData?.groups || componentData?.cohortes[0].groups,
    [preData, componentData]
  );

  const { push } = useHistory();
  const tableData = useMemo(
    () => ({
      loading,
      error,
      data: data,
      columns: [
        { key: "name", label: "Nombre", align: "left" },
        { key: "type", label: "Tipo de grupo", align: "left" },
      ],
      addButtonLabel: "Crear grupo",
      actions: {
        view: {
          onSubmit: (id) => push(`/group/${id}`),
        },
        create: {
          initialValues: {
            name: "",
            type: "pp",
          },
          onSubmit: async (values) => {
            const result = await createGroup({
              variables: values,
            });
            if (result?.data?.createGroup?.id) {
              await addGroupToCohorte({
                variables: {
                  cohorteId: data.cohortes[0].id,
                  groupId: [result.data.createGroup.id],
                },
              });
            }
            if (cohorte) preRefetch();
            else onRefetch && onRefetch();
          },
          inputs: [{ key: "name", label: "Nombre" }],
        },
      },
    }),
    [
      data,
      error,
      loading,
      push,
      createGroup,
      addGroupToCohorte,
      onRefetch,
      preRefetch,
      cohorte,
    ]
  );

  return (
    <div className={className} style={{ height: "50vh", width: "100%" }}>
      <Tabla
        loading={loading}
        data={tableData}
        count={count?.countGroups || undefined}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </div>
  );
}

export default GroupStudent
