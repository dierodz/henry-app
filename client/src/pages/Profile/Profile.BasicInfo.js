import { Button, Grid, TextField } from "@material-ui/core";
import ProfileCard from "components/Profile/Card";
import { useFormik } from "formik";
import React, { useState } from "react";

function BasicInfo({ data, onSubmit, onlyView }) {
  const { givenName, familyName } = data;
  const formik = useFormik({
    initialValues: { givenName, familyName },
    onSubmit: onSubmit,
  });

  const [readOnly, setReadOnly] = useState(true);
  return (
    <ProfileCard
      title="Información básica"
      onlyView={onlyView}
      actions={
        readOnly ? (
          <Button
            type="button"
            variant="outlined"
            onClick={() => {
              setReadOnly(false);
              formik.setValues({ givenName, familyName });
            }}
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
            label="Nombre"
            value={readOnly ? givenName : formik.values.givenName}
            onChange={formik.handleChange}
            InputProps={{
              readOnly,
            }}
            name="givenName"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Apellido"
            value={readOnly ? familyName : formik.values.familyName}
            onChange={formik.handleChange}
            InputProps={{
              readOnly,
            }}
            name="familyName"
          />
        </Grid>
      </Grid>
    </ProfileCard>
  );
}

export default BasicInfo;
