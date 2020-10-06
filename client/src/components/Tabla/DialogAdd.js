import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { useMutation } from '@apollo/client';
import { CREATE_COHORTE } from "apollo/Mutations/cohortes";

function DialogAdd({ openAdd, handleAddClose, columnas }) {

   const [createCohorte, { data }] = useMutation(CREATE_COHORTE);
   const [state, setState] = useState ({});

   const handleInputChange = (e) => {
      setState({
         ...state,
         [e.target.name]: e.target.value,
      })

    
   }
   const handleSubmit = (e) => {
      e.preventDefault();
      createCohorte( {variables: 
          {name: state[columnas[0]],
           number: state[columnas[2]],
           starDate: state[columnas[3]],
           instructor: state[columnas[1]]
         }})
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
            {columnas &&
               columnas.map((col) => (
                  <TextField
                     margin="dense"
                     key={col}
                     label={col}
                     type="text"
                     fullWidth
                     onChange={handleInputChange}
                     name={col}
                  />
               ))}
         </DialogContent>
         
         <DialogActions>
            <form onSubmit={handleSubmit} >
            <Button onClick={handleAddClose} color="primary">
               Cancelar
            </Button>
            <Button onClick={handleAddClose} type="submit" color="primary">
               Enviar
            </Button>
            </form>
         </DialogActions>
      </Dialog>
   );
}

export default DialogAdd;
