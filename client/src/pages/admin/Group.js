import React, { useMemo, useState } from "react";
import { Post } from "pages/Posts/Post";
import { useMutation, useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import { useHistory } from "react-router-dom";
import {
  ADD_USER_TO_GROUP,
  REMOVE_USER_OF_GROUP,
} from "apollo/Mutations/users";
import { GROUPS } from "apollo/querys/groups";
import { useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";

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
    <>
      <div
        className={className}
        style={{ height: "10vh", width: "10vh", marginLeft: "92%" }}
      >
        <AlumnsComponent tableData={tableData} />
      </div>

      <Post />
    </>
  );
}

function AlumnsComponent(tableData) {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button onClick={() => setShow(true)} style={{ borderRadius: 80 }}>
        <PeopleIcon style={{ fontSize: 40 }} label="Alumnos" />
      </Button>
      <Dialog
        open={show}
        onClose={() => setShow(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Alumnos</DialogTitle>
        <DialogContent>
          <Tabla data={tableData.tableData} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShow(false)} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default GroupStudentPP;
