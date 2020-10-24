import React, { useEffect, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { Tabla } from "components/Tabla";
import { useHistory } from "react-router-dom";
import { CREATE_GROUP } from "apollo/Mutations/groups";
import { ADD_GROUP_TO_COHORTE } from "apollo/Mutations/cohortes";
import { hooks } from "shared";

const { useGroups } = hooks;

function Groups({ className, cohorte, onRefetch }) {
  const {
    fetch,
    refetch,
    result,
    count,
    loading: fetchLoading,
    rowsPerPageOptions,
    rowsPerPage,
    onChangePage,
    onChangeRowsPerPage,
    page,
  } = useGroups({
    where: { cohorteId: cohorte.id },
    order: ["name"],
  });
  useEffect(() => {
    fetch();
  }, [rowsPerPage, page, fetch]);

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
    () =>
      preData?.groups.map((grupo) => {
        const grupototal = { ...grupo, qty: grupo.students.length };
        return grupototal;
      }) || componentData?.cohortes[0].groups,
    [preData, componentData]
  );

  const { push } = useHistory();
  const tableData = useMemo(
    () => ({
      loading,
      data: result,
      columns: [
        { key: "name", label: "Nombre", align: "left" },
        { key: "type", label: "Tipo de grupo", align: "left" },
        { key: "qty", label: "Cant Alumnos", align: "left" },
      ],
      addButtonLabel: "Crear grupo",
      actions: {
        view: {
          onSubmit: (id) => push(`/admin/group/${id}`),
        },
        create: {
          initialValues: {
            name: "",
            type: "standup",
          },
          onSubmit: async (values) => {
            const result = await createGroup({
              variables: values,
            });
            if (result?.data?.createGroup?.id) {
              await addGroupToCohorte({
                variables: {
                  cohorteId: cohorte.id,
                  groupId: [result.data.createGroup.id],
                },
              });
            }
            if (cohorte) refetch();
            else onRefetch && onRefetch();
          },
          inputs: [{ key: "name", label: "Nombre" }],
        },
      },
    }),
    [
      loading,
      push,
      createGroup,
      addGroupToCohorte,
      onRefetch,
      refetch,
      cohorte,
      result,
    ]
  );

  return (
    <div className={className} style={{ height: "50vh", width: "100%" }}>
      <Tabla
        loading={loading}
        data={tableData}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        onChangePage={(_, page) => onChangePage(page)}
        onChangeRowsPerPage={(e) => onChangeRowsPerPage(e.target.value)}
      />
    </div>
  );
}

export default Groups;
