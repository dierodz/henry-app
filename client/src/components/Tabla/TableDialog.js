import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import { DatePicker } from "@material-ui/pickers";
import { Autocomplete } from '@material-ui/lab';

function TableDialog({ context, opened, onClose }) {
   const formik = useFormik(context)

   const handleSubmit = (e) => {
      e.preventDefault()
      formik.handleSubmit()
      onClose()
   }

   return (
      <Dialog
         open={opened}
         onClose={onClose}
         aria-labelledby="form-dialog-title"
      >
         <DialogTitle id="form-dialog-title">{context.title || ''}</DialogTitle>
         <DialogContent>
            <DialogContentText>
               Por favor, introduzca los datos correspondientes.
            </DialogContentText>
            {context.inputs &&
               context.inputs.map((input) => (
                  <Field key={input.key} input={{
                     ...input,
                     value: formik.values[input.key],
                     handleChange: formik.handleChange,
                     setFieldValue: formik.setFieldValue
                  }} />
               ))}
         </DialogContent>

         <DialogActions>
            <form onSubmit={handleSubmit}>

               <Button onClick={onClose} color="primary">
                  Cancelar
               </Button>
               <Button onClick={handleSubmit} type="submit" color="primary">
                  {context.submitButtonLabel || 'Aceptar'}
               </Button>
            </form>
         </DialogActions>
      </Dialog>
   );
}

function Field({ input }) {
   const { type, key, label, value, options, handleChange, setFieldValue } = input

   switch (type) {
      case 'date': return (
         <DatePicker
            name={key}
            value={typeof value === 'string' ? new Date(parseInt(value)) : value}
            onChange={(value) => setFieldValue(key, value)}
            format="dd/MM/yyyy"
            inputVariant="outlined"
            label={label}
            variant="dialog"
            fullWidth
            margin="normal"
         />
      )
      case 'select': return (
         <Autocomplete
            name={key}
            options={options}
            getOptionLabel={(option) => option.label}
            onChange={(_, { value }) => setFieldValue(key, value)}
            value={(() => options.find(op => op.value === value))()}
            renderInput={(params) => (
               <TextField
                  {...params}
                  label={label}
                  type="text"
                  fullWidth
                  name={key}
                  variant="outlined"
                  margin="normal"
               />
            )}
         />

      )
      default: return (<TextField
         label={label}
         type="text"
         fullWidth
         onChange={handleChange}
         name={key}
         value={value}
         variant="outlined"
         margin="normal"
      />)
   }
}

export default TableDialog;
