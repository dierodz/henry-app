import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";

function DialogAdd({ create, openAdd, handleAddClose, columnas }) {
   const formik = useFormik(create)

   const handleSubmit = (e) => {
      e.preventDefault()
      formik.handleSubmit()
      handleAddClose()
   }

   return (
      <Dialog
         open={openAdd}
         onClose={handleAddClose}
         aria-labelledby="form-dialog-title"
      >
         <DialogTitle id="form-dialog-title">Agregar</DialogTitle>
         <DialogContent>
            <DialogContentText>
               Por favor, introduzca los datos correspondientes.
            </DialogContentText>
            {create.inputs &&
               create.inputs.map(({ key, label }) => (
                  <TextField
                     margin="dense"
                     key={key}
                     label={label}
                     type="text"
                     fullWidth
                     onChange={formik.handleChange}
                     name={key}
                  />
               ))}
         </DialogContent>

         <DialogActions>
            <form onSubmit={handleSubmit} >
               <Button onClick={handleAddClose} color="primary">
                  Cancelar
            </Button>
               <Button onClick={handleSubmit} type="submit" color="primary">
                  Enviar
            </Button>
            </form>
         </DialogActions>
      </Dialog>
   );
}

export default DialogAdd;
