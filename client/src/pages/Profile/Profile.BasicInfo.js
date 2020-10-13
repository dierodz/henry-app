import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";

const style = {
  AccordionActions: {
    justifyContent: "flex-end",
    padding: "16px",
    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
    background: "#f3f3f3",
  },
};

function BasicInfo({ data: { givenName, familyName }, onSubmit }) {
  const formik = useFormik({
    initialValues: { givenName, familyName },
    onSubmit: onSubmit,
  });
  return (
    <Card variant="outlined" style={{ width: "100%" }}>
      <CardHeader>
        <Typography color="textSecondary" gutterBottom>
          Información básica
        </Typography>
      </CardHeader>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Nombre"
              value={formik.values.givenName}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Apellido"
              value={formik.values.familyName}
              onChange={formik.handleChange}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions style={style.AccordionActions}>
        <Button variant="outlined">Editar</Button>
      </CardActions>
    </Card>
  );
}

export default BasicInfo;
