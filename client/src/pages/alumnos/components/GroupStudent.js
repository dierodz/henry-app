import React, { useEffect, useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { Tabla } from "components/Tabla";
import { useHistory } from "react-router-dom";
import { CREATE_GROUP, DELETE_GROUP } from "apollo/Mutations/groups";
import { ADD_GROUP_TO_COHORTE } from "apollo/Mutations/cohortes";
import { USER_FULL } from "apollo/querys/users";

function GroupStudent(className) {
  const { user } = useSelector((state) => state.auth);
  const variables = { id: user && user.id };
  const { loading: queryLoading, error, data, refetch } = useQuery(USER_FULL, {
    variables,
  });
data && console.log(user);

  const [createGroup, resultCreate] = useMutation(CREATE_GROUP);
  const [removeGroup, resultDelete] = useMutation(DELETE_GROUP);
  // eslint-disable-next-line no-unused-vars
  const [addGroupToCohorte, { loading: addLoading }] = useMutation(
    ADD_GROUP_TO_COHORTE
  );

  const loading = useMemo(() => queryLoading || addLoading, [
    queryLoading,
    addLoading,
  ]);

  const { push } = useHistory();
  const tableData = useMemo(
    () => ({
      loading,
      error,
      data:
        data &&
        data.users[0].groups.map((group) => {
          return {
            ...group,
            qty: group.students.length,
          };
        }),
      columns: [
        { key: "name", label: "Nombre", align: "left" },
        { key: "type", label: "Tipo de grupo", align: "left" },
        { key: "qty", label: "Cantidad de alumnos", align: "left" },
      ],
      addButtonLabel: "Crear grupo",
      actions: {
        create: {
          initialValues: {
            name: "",
            type: "pp",
          },
          inputs: [{ key: "name", label: "Nombre" }],

          onSubmit: async (values) => {
            const datos = {
              variables: {
                ...values,
                name: values.name,
                studentId: data && data.users[0].id,
              },
            };
               await createGroup({
              variables: {
                name: datos.variables.name,
                type: datos.variables.type,
                studentId: [parseInt(datos.variables.studentId)],
              },
            });
          },
        },
       delete: {
          onSubmit: async (values) => {
                    const datos = {
                      variables: {
                        id: values,
                      },
                    };
                    await removeGroup({
                      variables: {
                        id: parseInt(datos.variables.id),
                      },
                    });
                  },
                },
                
        view: {
          onSubmit: (id) => push(`/student/groups/${id}`),
        },
      },
    }),
    [data, error, loading, createGroup, push, removeGroup]
  );

  useEffect(() => {
    if (!resultCreate.loading && resultCreate.called) {
      refetch();
    }
  }, [resultCreate, refetch]);

  useEffect(() => {
    if (!resultDelete.loading && resultDelete.called) {
      refetch();
    }
  }, [resultDelete, refetch]);

  return (
    <div className={className} style={{ height: "100%", width: "100%" }}>
      <Tabla loading={loading} data={tableData} />
    </div>
  );
}

export default GroupStudent;
