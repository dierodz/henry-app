import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { useFormik } from "formik";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useHistory } from "react-router-dom";
import { signInWithGoogle } from "dispatchers/auth";
import { useQuery } from "hooks";
import jwt from "jsonwebtoken";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function RegisterScreen() {
  const classes = useStyles();
  const history = useHistory();
  const { token } = useQuery();
  useEffect(() => {
    if (!token) history.push("/auth/signin");
    else if (JSON.parse(localStorage.getItem("token"))) history.push("/");
  }, [history, token]);
  const [initialValues] = useState(() => {
    const values = {
      firstName: "",
      lastName: "",
      nickName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    };
    try {
      const result = jwt.decode(token);
      if (result !== null) return { ...values, ...result };
    } catch {
      history.push("/auth/signin");
    }
    history.push("/auth/signin");
    return values;
  });

  const [visibilityPass, setVisibilityPass] = React.useState({
    pass1: false,
    pass2: false,
  });
  const handleClickShowPassword = (e) => {
    setVisibilityPass({ ...visibilityPass, [e]: !visibilityPass[e] });
  };

  const formik = useFormik({
    initialValues,
    validate: (values) => {
      setVisibilityPass({ pass1: false, pass2: false });
      const errors = {};
      if (!values.firstName) errors.firstName = "Required";
      if (!values.lastName) errors.lastName = "Required";
      if (!values.nickName) errors.nickName = "Required";
      if (!values.email) errors.email = "Required";
      else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) errors.password = "Required";
      else if (values.password.length <= 8)
        errors.password = "Must be more than 8 characters";
      if (values.password !== values.passwordConfirm)
        errors.passwordConfirm = "Required";
      return errors;
    },
    onSubmit: async (values) => {
      alert(values.firstName);
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>

        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                autoFocus
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.errors.firstName ? true : false}
                helperText={
                  formik.errors.firstName ? "Debes ingresar tu nombre" : null
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Apellido"
                name="lastName"
                autoComplete="lname"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.errors.lastName ? true : false}
                helperText={
                  formik.errors.lastName ? "Debes ingresar tu apellido" : null
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="nickName"
                label="Nick"
                name="nickName"
                autoComplete="nname"
                value={formik.values.nickName}
                onChange={formik.handleChange}
                error={formik.errors.nickName ? true : false}
                helperText={
                  formik.errors.nickName ? "Debes ingresar un apodo" : null
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email ? true : false}
                helperText={
                  formik.errors.email ? "Debes ingresar un email valido" : null
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type={visibilityPass.pass1 ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password ? true : false}
                helperText={
                  formik.errors.password
                    ? "La contraseña debe tener mas de 8 caracteres"
                    : null
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword("pass1")}
                        edge="end"
                      >
                        {visibilityPass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordConfirm"
                label="Repite contraseña"
                type={visibilityPass.pass2 ? "text" : "password"}
                id="passwordConfirm"
                value={formik.values.passwordConfirm}
                onChange={formik.handleChange}
                error={formik.errors.passwordConfirm ? true : false}
                helperText={
                  formik.errors.passwordConfirm
                    ? "Las contraseñas no coinciden"
                    : null
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword("pass2")}
                        edge="end"
                        name="icono"
                      >
                        {visibilityPass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Acepto terminos y condiciones de la App"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrarme
          </Button>
          <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="center"
          >
            Tambien puede registrarte con:
            <Grid item className={classes.icons}>
              <IconButton onClick={() => signInWithGoogle()} color="primary">
                <Icon className="fab fa-google" aria-hidden="true" />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item>
              <Link href="/auth/login" variant="body2">
                Ya tengo una cuenta!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://www.soyhenry.com/">
            Henry
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </Container>
  );
}
