import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function DialogDel({ opened, onClose, onSubmit, fullScreen }) {
   const handleSubmit = async () => {
      if (onSubmit) await onSubmit()
      onClose()
   }
   return (
      <Dialog
         fullScreen={fullScreen}
         open={opened}
         onClose={onClose}
         aria-labelledby="responsive-dialog-title"
      >
         <DialogTitle id="responsive-dialog-title">{"Eliminar"}</DialogTitle>
         <DialogContent>
            <DialogContentText>
               Esta acción eliminara permanentemente el elemento.
               ¿Desea continuar?
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button autoFocus onClick={onClose} color="primary">
               Cancelar
            </Button>
            <Button onClick={handleSubmit} color="primary" autoFocus>
               Aceptar
            </Button>
         </DialogActions>
      </Dialog>
   );
}

export default DialogDel;
