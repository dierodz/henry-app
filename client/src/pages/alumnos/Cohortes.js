import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import { COHORTES, COUNT_COHORTES } from "apollo/querys/cohortes";
import {
  CREATE_COHORTE,
  DELETE_COHORTE,
  EDIT_COHORTE,
} from "apollo/Mutations/cohortes";
import { getUserRol } from "apollo/querys/users";
import { useHistory } from "react-router-dom";
import Alumns from "pages/admin/Cohortes/Alumns";
import Groups from "pages/admin/Cohortes/groups";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

function Cohortes({ className }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  function onChangePage(_, page) {
    setPage(page);
    refetch({
      limit: rowsPerPage,
      offset: rowsPerPage * page,
    });
  }
  function onChangeRowsPerPage(e) {
    setRowsPerPage(e.target.value);
    refetch({
      limit: rowsPerPage,
      offset: rowsPerPage * page,
    });
  }
  const { loading, error, data: preData, refetch } = useQuery(COHORTES, {
    variables: {
      limit: rowsPerPage,
      offset: rowsPerPage * page,
    },
  });
  const { data: count } = useQuery(COUNT_COHORTES);
  const instructors = useQuery(getUserRol, {
    variables: { role: "instructor" },
  });
  const [createMutation, resultCreate] = useMutation(CREATE_COHORTE);
  const [deleteMutation, resultDelete] = useMutation(DELETE_COHORTE);
  const [updateMutation, resultUpdate] = useMutation(EDIT_COHORTE);
  const history = useHistory();

  const data = useMemo(() => {
    if (Array.isArray(preData?.cohortes)) {
      return preData.cohortes.map((item) => {
        return {
          ...item,
          instructorDisplay: `${item.instructor.givenName || ""} ${
            item.instructor.familyName || ""
          }`,
          instructor: item.instructor.id,
          groups: item.groups.length,
          alumns: item.users.length,
        };
      });
    } else return preData;
  }, [preData]);

  const tableData = useMemo(
    () => ({
      loading,
      error,
      data: data,
      columns: [
        { key: "name", label: "Nombre del cohorte", align: "left" },
        { key: "instructorDisplay", label: "Instructor", align: "left" },
        {
          key: "groups",
          label: "Grupos",
          align: "left",
          component: (cohorte) => <GroupsComponent cohorte={cohorte} />,
        },
        {
          key: "alumns",
          label: "Alumnos",
          align: "left",
          component: (cohorte) => <AlumnsComponent cohorte={cohorte} />,
        },
      ],
      actions: {
          inputs: [
            { key: "name", label: "Nombre" },
            {
              key: "instructor",
              label: "Instructor",
              type: "select",
              options: (() => {
                return instructors.data?.getUserRol
                  ? instructors.data.getUserRol.map(
                      ({ givenName, familyName, id }) => ({
                        value: id,
                        label: `${givenName} ${familyName}`,
                      })
                    )
                  : [];
              })(),
            },
            { key: "startDate", label: "Fecha de inicio", type: "date" },
          ],
        view: {
          onSubmit: (id) => {
            history.push("/student/cohortes/" + id);
          },
        },
      },
    }),
    [
      data,
      history,
      error,
      loading,
      createMutation,
      deleteMutation,
      updateMutation,
      instructors.data,
    ]
  );

  useEffect(() => {
    if (!resultCreate.loading && resultCreate.called) {
      refetch();
    }
  }, [resultCreate, refetch]);

  useEffect(() => {
    if (!resultUpdate.loading && resultUpdate.called) {
      refetch();
    }
  }, [resultUpdate, refetch]);

  useEffect(() => {
    if (!resultDelete.loading && resultDelete.called) {
      refetch();
    }
  }, [resultDelete, refetch]);
  console.log(count);
  return (
    <div style={{ height: "calc(100vh - 65px)" }}>
      <Tabla
        loading={loading}
        data={tableData}
        count={count?.countCohortes || undefined}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </div>
  );
}

function AlumnsComponent(cohorte) {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button onClick={() => setShow(true)}>{cohorte.cohorte.alumns}</Button>
      <Dialog
        open={show}
        onClose={() => setShow(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Alumnos</DialogTitle>
        <DialogContent>
          <Alumns cohorte={cohorte.cohorte} />
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
function GroupsComponent(cohorte) {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button onClick={() => setShow(true)}>{cohorte.cohorte.groups}</Button>
      <Dialog
        open={show}
        onClose={() => setShow(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Groups</DialogTitle>
        <DialogContent>
          <Groups cohorte={cohorte.cohorte} />
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

export default Cohortes;