import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

function DialogAdd({openAdd, handleAddClose}) {
   return (
      <Dialog open={openAdd} onClose={handleAddClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Agregar Cohorte</DialogTitle>
      <DialogContent>
        <DialogContentText>
         Por favor, introduzca Nombre de Cohorte e Instructor
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nombre de Cohorte"
          type="text"
          fullWidth
        />
           <TextField
          margin="dense"
          id="name"
          label="Nombre de Instructor"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleAddClose} color="primary">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
   )
}

export default DialogAdd;
