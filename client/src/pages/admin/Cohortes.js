import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import COHORTES from "apollo/querys/cohortes";
import { CREATE_COHORTE, DELETE_COHORTE, EDIT_COHORTE } from "apollo/Mutations/cohortes";
import { getUserRol } from "apollo/querys/users";
import Alumns from "./Cohortes/Alumns";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";

function Cohortes({ className }) {

   const { loading, error, data: preData, refetch } = useQuery(COHORTES);
   const instructors = useQuery(getUserRol, {
      variables: { role: "instructor" },
   });
   const [createMutation, resultCreate] = useMutation(CREATE_COHORTE)
   const [deleteMutation, resultDelete] = useMutation(DELETE_COHORTE)
   const [updateMutation, resultUpdate] = useMutation(EDIT_COHORTE)

   const data = useMemo(() => {
      if (Array.isArray(preData?.cohortes)) {
         return preData.cohortes.map((item) => {
            debugger
            return {
               ...item,
               instructorDisplay: `${item.instructor.givenName || ''} ${item.instructor.familyName || ''}`,
               instructor: item.instructor.id,
               groups: item.groups.length,
               alumns: item.users.length
            }
         })
      } else return preData
   }, [preData])

   const tableData = useMemo(() => ({
      loading,
      error,
      data: data,
      columns: [
         { key: 'name', label: 'Nombre del cohorte', align: 'left' },
         { key: 'instructorDisplay', label: 'Instructor', align: 'left' },
         { key: 'groups', label: 'Grupos', align: 'left' },
         {
            key: 'alumns', label: 'Alumnos', align: 'left', component: (cohorte) => (<AlumnsComponent cohorte={cohorte} />)
         },
      ],
      addButtonLabel: 'Agregar cohorte',
      actions: {
         create: {
            initialValues: {
               name: undefined,
               instructor: undefined,
               startDate: new Date(),
            },
            inputs: [
               { key: 'name', label: "Nombre" },
               {
                  key: 'instructor', label: "Instructor", type: "select", options: (() => {
                     return instructors.data?.getUserRol
                        ? instructors.data.getUserRol.map(({ givenName, familyName, id }) => ({ value: id, label: `${givenName} ${familyName}` }))
                        : []
                  })()
               },
               { key: 'startDate', label: "Fecha de inicio", type: 'date' }
            ],
            onSubmit: async (values) => {
               await createMutation({
                  variables: {
                     ...values,
                     instructor: parseInt(values.instructor),
                  }
               })
            },
            submitButtonLabel: 'Crear',
            title: 'Crear cohorte'
         },
         update: {
            inputs: [
               { key: 'name', label: "Nombre" },
               {
                  key: 'instructor', label: "Instructor", type: "select", options: (() => {
                     return instructors.data?.getUserRol
                        ? instructors.data.getUserRol.map(({ givenName, familyName, id }) => ({ value: id, label: `${givenName} ${familyName}` }))
                        : []
                  })()
               },
               { key: 'startDate', label: "Fecha de inicio", type: 'date' }
            ],
            onSubmit: async (values) => {
               await updateMutation({
                  variables: {
                     ...values,
                     instructor: parseInt(values.instructor),
                  }
               })
            },
            submitButtonLabel: 'Enviar cambios',
            title: 'Editar cohorte'
         },
         delete: {
            onSubmit: async (id) => {
               await deleteMutation({
                  variables: {
                     id: parseInt(id)
                  }
               })
            }
         }
      }
   }), [data, error, loading, createMutation, deleteMutation, updateMutation, instructors.data]);

   useEffect(() => {
      if (!resultCreate.loading && resultCreate.called) {
         refetch()
      }
   }, [resultCreate, refetch])

   useEffect(() => {
      if (!resultUpdate.loading && resultUpdate.called) {
         refetch()
      }
   }, [resultUpdate, refetch])

   useEffect(() => {
      if (!resultDelete.loading && resultDelete.called) {
         refetch()
      }
   }, [resultDelete, refetch])

   return (
      <div className={className}>
         <Tabla data={tableData} />
      </div>
   );
}

function AlumnsComponent(cohorte) {
   const [show, setShow] = useState(false)
   return (
      <>
         <Button onClick={() => setShow(true)}>{cohorte.cohorte.alumns}</Button>
         <Dialog open={show} onClose={() => setShow(false)} fullWidth maxWidth="md" >
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
   )
}

export default Cohortes;
