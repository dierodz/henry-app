import React, { useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import { useHistory } from "react-router-dom";
import {
  ADD_USER_TO_GROUP,
  REMOVE_USER_OF_GROUP,
} from "apollo/Mutations/users";
import { GROUPS } from "apollo/querys/groups";
import { useParams } from "react-router-dom";

function GroupStudentPP(className) {
  let { id } = useParams();
  const variables = { where: { id: parseInt(id) } };
  const { loading: queryLoading, error, data } = useQuery(GROUPS, {
    variables,
  });

  const [addUsersToGroups, { loading: addLoading }] = useMutation(
    ADD_USER_TO_GROUP
  );

  const [removeUserOfGroup, { loading: removeLoading }] = useMutation(
    REMOVE_USER_OF_GROUP
  );

  const loading = useMemo(() => queryLoading || addLoading || removeLoading, [
    queryLoading,
    addLoading,
    removeLoading,
  ]);

  const { push } = useHistory();

  const tableData = useMemo(
    () => ({
      loading,
      error,
      data: data && data.groups[0].students,
      columns: [
        { key: "givenName", label: "Nombre", align: "left" },
        { key: "familyName", label: "Apellido", align: "left" },
        { key: "email", label: "Mail", align: "left" },
      ],
      addButtonLabel: "Invitar",
      actions: {
        view: {
          onSubmit: (id) => push(`/profile/${id}`),
        },
        delete: {
          initialValues: {
            studentId: "",
          },

          onSubmit: async (values) => {
            const datos = {
              variables: {
                ...values,
                id: id,
                userId: values,
              },
            };
            console.log(datos);
            await removeUserOfGroup({
              variables: {
                id: parseInt(datos.variables.id),
                userId: parseInt(datos.variables.userId),
              },
            });
          },
        },
        create: {
          initialValues: {
            studentId: "",
            id: id,
          },
          inputs: [{ key: "studentId", label: "studentId" }],
          onSubmit: async (values) => {
            const datos = {
              variables: {
                ...values,
              },
            };
            await addUsersToGroups({
              variables: {
                id: parseInt(datos.variables.id),
                group: { studentId: parseInt(datos.variables.studentId) },
              },
            });
          },
          submitButtonLabel: "Invitar",
          title: "Invitar estudiante",
        },
      },
    }),
    [loading, error, data, id, push, removeUserOfGroup, addUsersToGroups]
  );

  return (
    <div className={className} style={{ height: "50vh", width: "100%" }}>
      <Tabla loading={loading} data={tableData} />
    </div>
  );
}

export default GroupStudentPP;
