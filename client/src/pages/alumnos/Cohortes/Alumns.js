import React, { useEffect, useMemo, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import { USER_FULL, COUNT_USERS } from "apollo/querys/users";
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
  const [
    execute,
    { loading: queryLoading, error, data: preData, refetch: preRefetch },
  ] = useLazyQuery(USER_FULL);

  const [executeCount, { data: count }] = useLazyQuery(COUNT_USERS);

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
      execute({
        variables,
      });
      executeCount({ variables });
    }
  }, [cohorte, execute, executeCount, variables]);

  const data = useMemo(
    () => preData?.users || componentData?.cohortes[0].users,
    [preData, componentData]
  );
  const loading = useMemo(() => queryLoading || componentLoading, [
    queryLoading,
    componentLoading,
  ]);

  const tableData = useMemo(
    () => ({
      loading,
      error,
      data: cohorte
        ? cohorte.users.map((user) => {
            return {
              ...user,
              familyName: capitalizeFirstLetter(user.familyName),
              givenName: capitalizeFirstLetter(user.givenName),
            };
          })
        : data,
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
        view: {
          onSubmit: (id) => push(`/profile/${id}`),
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
