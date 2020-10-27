import React, { useMemo, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import { getUserRol } from "apollo/querys/users";
import { ADD_ROLE } from "apollo/Mutations/role";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import InstructorCohortes from "pages/admin/InstructorCohortes";

function Instructors({ className }) {
  const { loading, error, data, refetch } = useQuery(getUserRol, {
    variables: { role: "instructor" },
  });

  const history = useHistory();

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [addRoleMutation, resultAddRole] = useMutation(ADD_ROLE);

  useEffect(() => {
    if (!resultAddRole.loading && resultAddRole.called) {
      refetch();
    }
  }, [resultAddRole, refetch]);

  // const cohorte = useMemo(() => {
  //   if (Array.isArray(data?.getUserRol)) {
  //     return data.getUserRol.map((item) => {
  //       return {
  //         cohortes: item.cohortes,
  //       };
  //     });
  //   }
  // }, [data]);

  const tableData = useMemo(
    () => ({
      loading,
      error,
      data: data
        ? data.getUserRol.map((user) => {
            return {
              __typename: user.__typename,
              familyName: capitalizeFirstLetter(user.familyName),
              givenName: capitalizeFirstLetter(user.givenName),
              id: user.id,
              roles: user.roles,
              cohortes: user.cohortes.length,
            };
          })
        : undefined,
      columns: [
        { key: "givenName", label: "Nombre", align: "left" },
        { key: "familyName", label: "Apellido", align: "left" },
        {
          key: "cohortes",
          label: "Cohortes",
          align: "left",
          component: (data) => <CohorteNames data={data} />,
        },
      ],
      addButtonLabel: "Agregar instructor",
      actions: {
        create: {
          initialValues: {
            email: "",
          },
          inputs: [{ key: "email", label: "Email" }],
          onSubmit: async (values) => {
            const data = {
              variables: {
                ...values,
                roleName: "instructor",
              },
            };
            await addRoleMutation(data);
          },
          submitButtonLabel: "Añadir",
          title: "Añadir Instructor",
        },
        delete: {
          onSubmit: (id) => alert(id),
        },
        view: {
          onSubmit: (id) => {
            history.push("/admin/instructor/" + id + "/cohortes");
          },
        },
      },
    }),
    [addRoleMutation, data, error, history, loading]
  );

  return (
    <div className={className}>
      <Tabla data={tableData} />
    </div>
  );
}

function CohorteNames(data) {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button onClick={() => setShow(true)}>{data.data.cohortes}</Button>
      <Dialog
        open={show}
        onClose={() => setShow(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Cohortes</DialogTitle>
        <DialogContent>
          <InstructorCohortes datos={data.data.id} />
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

export default Instructors;
