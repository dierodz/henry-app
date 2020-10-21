import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import { USER_FULL, COUNT_USERS } from "apollo/querys/users";
import { ADD_USER_TO_COHORTE } from "apollo/Mutations/cohortes";
import { Button, ButtonGroup, Snackbar } from "@material-ui/core";
import { MailOutlineRounded, FileCopyRounded } from "@material-ui/icons";
import { useCopyToClipboard } from "react-use";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";

function Alumns({
  className,
  cohorte,
  data: componentData,
  loading: componentLoading,
}) {
  // const [
  //   execute,
  //   { loading: queryLoading, error, data: preData, refetch: preRefetch },
  // ] = useLazyQuery(USER_FULL);

  const [inviteMutation, resultInvite] = useMutation(ADD_USER_TO_COHORTE);

  const [executeCount, { loading, error, data: count }] = useLazyQuery(
    COUNT_USERS
  );

  const [{ value: copyValue }, copyToClipboard] = useCopyToClipboard();

  const [showSnackbar, setShowSnackbar] = useState(false);

  const { push } = useHistory();

  useEffect(() => {
    if (copyValue) {
      setShowSnackbar(true);
    }
  }, [copyValue]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  function onChangePage(_, page) {
    setPage(page);
  }
  function onChangeRowsPerPage(e) {
    setRowsPerPage(e.target.value);
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const variables = useMemo(
    () => ({
      where: cohorte ? { Cohorte: { id: cohorte.id } } : undefined,
      limit: rowsPerPage,
      offset: rowsPerPage * page,
    }),
    [rowsPerPage, page, cohorte]
  );

  useEffect(() => {
    if (cohorte) {
      //   execute({
      //     variables,
      //   });
      executeCount({ variables });
    }
  }, [cohorte, executeCount, variables]);

  const data = useMemo(
    () =>
      (cohorte &&
        cohorte.users.map((user) => {
          var usuario = {
            __typename: user.__typename,
            givenName: user.givenName && capitalizeFirstLetter(user.givenName),
            familyName:
              user.familyName && capitalizeFirstLetter(user.familyName),
            email: user.email,
            id: user.id,
            nickName: user.nickName,
            photoUrl: user.photoUrl,
            roles: user.roles,
            cohortes: user.cohortes,
          };
          return usuario;
        })) ||
      componentData?.cohortes[0].users,
    [componentData]
  );
  // const loading = useMemo(() => queryLoading || componentLoading, [
  //   queryLoading,
  //   componentLoading,
  // ]);

  const tableData = useMemo(
    () => ({
      loading,
      error,
      data: data && data,
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
      addButtonLabel: "Agregar estudiante",
      actions: {
        view: {
          onSubmit: (id) => push(`/profile/${id}`),
        },
        create: {
          initialValues: {
            userId: null,
          },
          inputs: [{ key: "userId", label: "Id" }],
          onSubmit: async (values) => {
            const data = {
              variables: {
                ...values,
                userId: Number(values.userId),
                cohorteId: cohorte.id,
              },
            };
            await inviteMutation(data);
          },
          submitButtonLabel: "Agregar",
          title: "Agregar estudiante",
        },
      },
    }),
    [data, error, loading, copyToClipboard, push]
  );

  return (
    <div className={className} style={{ height: "50vh", width: "100%" }}>
      <Tabla
        loading={loading}
        data={tableData}
        count={count?.countUsers || undefined}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />{" "}
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
