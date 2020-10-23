import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import {
  CREATE_COHORTE,
  DELETE_COHORTE,
  EDIT_COHORTE,
} from "apollo/Mutations/cohortes";
import { getUserRol } from "apollo/querys/users";
import { useHistory } from "react-router-dom";
import Alumns from "./Cohortes/Alumns";
import Groups from "./Cohortes/groups";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { hooks } from "shared";
const { useCohortes } = hooks;

function Cohortes() {
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

  const instructors = useQuery(getUserRol, {
    variables: { role: "instructor" },
  });

  const {
    fetch,
    refetch,
    result,
    count,
    loading,
    rowsPerPageOptions,
    rowsPerPage,
    onChangePage,
    onChangeRowsPerPage,
    page,
  } = useCohortes({
    order: ["name"],
  });
  useEffect(() => {
    fetch();
  }, [rowsPerPage, page, fetch]);

  const data = useMemo(() => {
    if (Array.isArray(result)) {
      console.log(result);
      return result.map((item) => {
        return {
          ...item,
          name: item.name.toUpperCase(),
          instructorDisplay: `${
            capitalizeFirstLetter(item.instructor.givenName) || ""
          } ${capitalizeFirstLetter(item.instructor.familyName) || ""}`,
          instructor: item.instructor.id,
          groups: item.groups.length,
          alumns: item.users.length,
          users: item.users,
        };
      });
    } else return result;
  }, [result]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const tableData = useMemo(
    () => ({
      loading,
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
      addButtonLabel: "Agregar cohorte",
      actions: {
        create: {
          initialValues: {
            name: "",
            instructor: undefined,
            startDate: new Date(),
          },
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
          onSubmit: async (values) => {
            await createMutation({
              variables: {
                ...values,
                instructor: parseInt(values.instructor),
              },
            });
          },
          submitButtonLabel: "Crear",
          title: "Crear cohorte",
        },
        update: {
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
          onSubmit: async (values) => {
            await updateMutation({
              variables: {
                ...values,
                instructor: parseInt(values.instructor),
              },
            });
          },
          submitButtonLabel: "Enviar cambios",
          title: "Editar cohorte",
        },
        delete: {
          onSubmit: async (id) => {
            await deleteMutation({
              variables: {
                id: parseInt(id),
              },
            });
          },
        },
        view: {
          onSubmit: (id) => {
            history.push("/admin/cohorte/" + id);
          },
        },
      },
    }),
    [
      data,
      history,
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
  return (
    <div style={{ height: "calc(100vh - 65px)" }}>
      <Tabla
        loading={loading}
        data={tableData}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        onChangePage={(_, page) => onChangePage(page)}
        onChangeRowsPerPage={(e) => onChangeRowsPerPage(e.target.value)}
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
