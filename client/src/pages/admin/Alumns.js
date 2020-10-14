import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import { getUserRol } from "apollo/querys/users";
import { INVITE_USER } from "apollo/Mutations/users";
import { Button, ButtonGroup, Snackbar } from "@material-ui/core";
import { FileCopyRounded, MailOutlineRounded } from "@material-ui/icons";
import { useCopyToClipboard } from "react-use";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";

function Alumns({ className }) {
  const { loading, error, data, refetch } = useQuery(getUserRol, {
    variables: { role: "student" },
  });
  const [inviteMutation, resultInvite] = useMutation(INVITE_USER);
  const { push } = useHistory();
  useEffect(() => {
    if (!resultInvite.loading && resultInvite.called) {
      refetch();
    }
  }, [resultInvite, refetch]);

  const [{ value: copyValue }, copyToClipboard] = useCopyToClipboard();
  const [showSnackbar, setShowSnackbar] = useState(false);
  useEffect(() => {
    if (copyValue) {
      setShowSnackbar(true);
    }
  }, [copyValue]);

  const tableData = useMemo(
    () => ({
      loading,
      error,
      data: data ? data.getUserRol : undefined,
      columns: [
        { key: "givenName", label: "Nombre", align: "left" },
        { key: "familyName", label: "Apellido", align: "left" },
        {
          key: "email",
          label: "Email",
          align: "left",
          component: (el) => (
            <ButtonGroup>
              <Button
                startIcon={<MailOutlineRounded />}
                href={`mailto: ${el.email}`}
              >
                Enviar
              </Button>
              <Button onClick={() => copyToClipboard(el.email)}>
                <FileCopyRounded />
              </Button>
            </ButtonGroup>
          ),
        },
      ],
      addButtonLabel: "Invitar estudiante",
      actions: {
        create: {
          initialValues: {
            email: undefined,
          },
          inputs: [{ key: "email", label: "Email" }],
          onSubmit: async (values) => {
            const data = {
              variables: {
                ...values,
                role: "student",
              },
            };
            await inviteMutation(data);
          },
          submitButtonLabel: "Invitar",
          title: "Invitar estudiante",
        },
        view: {
          onSubmit: (id) => push(`/profile/${id}`),
        },
      },
    }),
    [data, error, loading, inviteMutation, copyToClipboard, push]
  );

  return (
    <div className={className}>
      <Tabla loading={loading} data={tableData} />
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="info">Email copiado al potapapeles</Alert>
      </Snackbar>
    </div>
  );
}

export default Alumns;
