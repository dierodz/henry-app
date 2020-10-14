import React, { useEffect, useMemo } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Tabla } from "components/Tabla";
import { COHORTE_BY_ID } from "apollo/querys/cohortes";
import { useHistory } from "react-router-dom";
import { CREATE_GROUP } from "apollo/Mutations/groups";
import { ADD_GROUP_TO_COHORTE } from "apollo/Mutations/cohortes";

function Groups({
  className,
  cohorte,
  data: componentData,
  loading: componentLoading,
  onRefetch,
}) {
  const [
    execute,
    { loading: queryLoading, error, data: preData, refetch: preRefetch },
  ] = useLazyQuery(COHORTE_BY_ID);

  const [createGroup, { loading: createLoading }] = useMutation(CREATE_GROUP);
  const [addGroupToCohorte, { loading: addLoading }] = useMutation(
    ADD_GROUP_TO_COHORTE
  );

  useEffect(() => {
    if (cohorte)
      execute({
        variables: { id: cohorte.id },
      });
  }, [cohorte, execute]);

  const loading = useMemo(
    () => queryLoading || componentLoading || createLoading || addLoading,
    [queryLoading, componentLoading, createLoading, addLoading]
  );

  const data = useMemo(() => preData || componentData, [
    preData,
    componentData,
  ]);

  const { push } = useHistory();
  const tableData = useMemo(
    () => ({
      loading,
      error,
      data: data?.cohortes[0].groups || undefined,
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
            type: "standup",
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
      <Tabla loading={loading} data={tableData} pageSize={5} />
    </div>
  );
}

export default Groups;
