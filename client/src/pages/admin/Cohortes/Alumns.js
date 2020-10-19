import React, { useEffect, useMemo, useState } from "react";
import { Tabla } from "components/Tabla";
import { Button, ButtonGroup, Snackbar } from "@material-ui/core";
import { MailOutlineRounded, FileCopyRounded } from "@material-ui/icons";
import { useCopyToClipboard } from "react-use";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import { hooks } from "shared";

const { useUsers } = hooks;

function Alumns({ className, cohorte, loading: componentLoading }) {
  const {
    fetch,
    //refetch,
    result,
    count,
    loading: fetchLoading,
    rowsPerPageOptions,
    rowsPerPage,
    onChangePage,
    onChangeRowsPerPage,
    page,
  } = useUsers({
    where: {
      Cohorte: {
        id: 2,
      },
    },
    order: ["givenName", "familyName"],
  });

  const [{ value: copyValue }, copyToClipboard] = useCopyToClipboard();

  const [showSnackbar, setShowSnackbar] = useState(false);

  const { push } = useHistory();

  useEffect(() => {
    if (copyValue) {
      setShowSnackbar(true);
    }
  }, [copyValue]);

  useEffect(() => {
    fetch();
  }, [rowsPerPage, page, fetch]);

  const loading = useMemo(() => fetchLoading || componentLoading, [
    fetchLoading,
    componentLoading,
  ]);

  const tableData = useMemo(
    () => ({
      loading,
      data: result,
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
    [result, loading, copyToClipboard, push]
  );

  console.log(result);

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
