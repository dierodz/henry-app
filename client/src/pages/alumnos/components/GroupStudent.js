import React, { useEffect, useMemo, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { Tabla } from "components/Tabla";
import { useHistory } from "react-router-dom";
import { CREATE_GROUP } from "apollo/Mutations/groups";
import { ADD_GROUP_TO_COHORTE } from "apollo/Mutations/cohortes";
import { GROUPS, COUNT_GROUPS } from "apollo/querys/groups";
import { USER_FULL } from "apollo/querys/users";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import Alumns from "pages/admin/Cohortes/Alumns";

function GroupStudent({
  className,
  // cohorte,
  // data: componentData,
  // loading: componentLoading,
  // onRefetch,
}) {
  const { user } = useSelector((state) => state.auth);
  const variables = { id: user && user.id };
  const { loading, error, data } = useQuery(USER_FULL, { variables });
  data && console.log(data);
  // const [
  //   execute,
  //   { loading: queryLoading, error, data: preData, refetch: preRefetch },
  // ] = useLazyQuery(GROUPS);

  // const [executeCount, { data: count }] = useLazyQuery(COUNT_GROUPS);

  const [createGroup, { loading: createLoading }] = useMutation(CREATE_GROUP);
  const [addGroupToCohorte, { loading: addLoading }] = useMutation(
    ADD_GROUP_TO_COHORTE
  );

  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  // function onChangePage(_, page) {
  //   setPage(page);
  // }
  // function onChangeRowsPerPage(e) {
  //   setRowsPerPage(e.target.value);
  // }

  // const variables = useMemo(
  //   () => ({
  //     where: cohorte ? { cohorteId: cohorte.id } : undefined,
  //     limit: rowsPerPage,
  //     offset: rowsPerPage * page,
  //   }),
  //   [rowsPerPage, page, cohorte]
  // );

  // useEffect(() => {
  //   if (cohorte) {
  //     execute({
  //       variables,
  //     });
  //     executeCount({ variables });
  //   }
  // }, [cohorte, execute, executeCount, variables]);

  // const loading = useMemo(
  //   () => queryLoading || componentLoading || createLoading || addLoading,
  //   [queryLoading, componentLoading, createLoading, addLoading]
  // );
  // const data = useMemo(
  //   () => preData?.groups || componentData?.cohortes[0].groups,
  //   [preData, componentData]
  // );

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
        {
          key: "alumns",
          label: "",
          align: "left",
          component: (cohorte) => <AlumnsComponent cohorte={cohorte} />,
        },
      ],
      addButtonLabel: "Crear grupo",
      actions: {
        view: {
          onSubmit: (cohorte) => {
            return AlumnsComponent(cohorte);
          },
        },
        // create: {
        //   initialValues: {
        //     name: "",
        //     type: "pp",
        //     studentId: user && user.id,
        //   },
        //   onSubmit: async (values) => {
        //     const result = await createGroup({
        //       variables: values,
        //     });
        //     if (result?.data?.createGroup?.id) {
        //       await addGroupToCohorte({
        //         variables: {
        //           cohorteId: data.cohortes[0].id,
        //           groupId: [result.data.createGroup.id],
        //         },
        //       });
        //     }
        //     if (cohorte) preRefetch();
        //     else onRefetch && onRefetch();
        //   },
        //   inputs: [{ key: "name", label: "Nombre" }],
        // },
      },
    }),
    [data, error, loading, createGroup, addGroupToCohorte]
  );

  function AlumnsComponent(cohorte) {
    const [show, setShow] = useState(false);
    console.log(cohorte);
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

  return (
    <div className={className} style={{ height: "50vh", width: "100%" }}>
      <Tabla loading={loading} data={tableData} />
    </div>
  );
}

export default GroupStudent;
