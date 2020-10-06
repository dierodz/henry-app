import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

function DialogEdit({ openEdit, handleEditClose, columnas }) {
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
               columnas.map((col) => (
                  <TextField
                     margin="dense"
                     key={col}
                     label={col}
                     type="text"
                     fullWidth
                  />
               ))}
         </DialogContent>
         <DialogActions>
            <Button onClick={handleEditClose} color="primary">
               Cancelar
            </Button>
            <Button onClick={handleEditClose} color="primary">
               Guardar Cambios
            </Button>
         </DialogActions>
      </Dialog>
   );
}

export default DialogEdit;
