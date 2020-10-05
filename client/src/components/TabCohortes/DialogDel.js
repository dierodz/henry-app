import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function DialogDel({openDel, handleDelClose, fullScreen}) {
   return (
      <Dialog
        fullScreen={fullScreen}
        open={openDel}
        onClose={handleDelClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Eliminar Cohorte"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Esta acción eliminara permanentemente el cohorte. Está Ud. seguro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDelClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelClose} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
   )
}

export default DialogDel
