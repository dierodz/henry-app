import { Button, Grid, TextField } from "@material-ui/core";
import ProfileCard from "components/Profile/Card";
import { useFormik } from "formik";
import React, { useState } from "react";

function Contact({ data: { email }, onSubmit, onlyView }) {
  const formik = useFormik({
    initialValues: { email },
    onSubmit: onSubmit,
  });
  const [readOnly, setReadOnly] = useState(true);

  return (
    <ProfileCard
      title="Contacto"
      onlyView={onlyView}
      actions={
        readOnly ? (
          <Button
            type="button"
            variant="outlined"
            onClick={() => setReadOnly(false)}
          >
            Editar
          </Button>
        ) : (
          <>
            <Button
              type="button"
              variant="outlined"
              onClick={() => {
                setReadOnly(true);
                formik.resetForm();
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disableElevation
              onClick={formik.handleSubmit}
            >
              Actualizar
            </Button>
          </>
        )
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Email"
            name="email"
            value={readOnly ? email : formik.values.email}
            onChange={formik.handleChange}
            InputProps={{
              readOnly,
            }}
          />
        </Grid>
      </Grid>
    </ProfileCard>
  );
}

export default Contact;
