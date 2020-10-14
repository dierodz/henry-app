import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { useMutation } from '@apollo/client';
import { EDIT_COHORTE } from "apollo/Mutations/cohortes";

function DialogEdit({ openEdit, handleEditClose, columnas }) {

   const [editCohorte] = useMutation(EDIT_COHORTE);
   const [state, setState] = useState({});

   const handleInputChange = (e) => {
      setState({
         ...state,
         [e.target.name]: e.target.value,
      })
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      editCohorte({
         variables:
         {
            id: 3,
            name: state[columnas[0]],
            number: state[columnas[2]],
            startDate: state[columnas[3]],
            instructor: state[columnas[1]]
         }
      })
   }

   return (
      <Dialog
         open={openEdit}
         onClose={handleEditClose}
         aria-labelledby="form-dialog-title"
      >
         <DialogTitle id="form-dialog-title">Editar</DialogTitle>
         <DialogContent>
            <DialogContentText>
               Por favor, introduzca los datos correspondientes.
            </DialogContentText>
            {columnas &&
               columnas.map(({ key, label }) => (
                  <TextField
                     margin="dense"
                     key={key}
                     label={label}
                     type="text"
                     fullWidth
                     onChange={handleInputChange}
                     name={key}
                  />
               ))}
         </DialogContent>
         <DialogActions>
            <form onSubmit={handleSubmit} >
               <Button onClick={handleEditClose} color="primary">
                  Cancelar
            </Button>
               <Button onClick={handleEditClose} type="submit" color="primary">
                  Guardar Cambios
            </Button>
            </form>
         </DialogActions>
      </Dialog>
   );
}

export default DialogEdit;
