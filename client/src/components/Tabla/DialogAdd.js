import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

function DialogAdd({ openAdd, handleAddClose, columnas }) {
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
            <Button onClick={handleAddClose} color="primary">
               Cancelar
            </Button>
            <Button onClick={handleAddClose} color="primary">
               Enviar
            </Button>
         </DialogActions>
      </Dialog>
   );
}

export default DialogAdd;
