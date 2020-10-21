import React, { useEffect } from "react";
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
import { useQuery } from "hooks";
import { useDispatch } from "react-redux";
import {
   signInWithEmail,
   signInWithToken,
   signInWithGithub,
   signInWithGoogle,
} from "dispatchers/auth";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
   paper: {
      marginTop: theme.spacing(8),
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
      marginTop: theme.spacing(1),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
   icons: {
      margin: theme.spacing(3, 0, 2),
   },
}));

export default function LoginScreen() {
   const dispatch = useDispatch();
   const classes = useStyles();
   const [visibilityPass, setVisibilityPass] = React.useState(false);
   const { token } = useQuery();
   const history = useHistory()
   useEffect(() => {
      if (JSON.parse(localStorage.getItem("token"))) history.push('/')
      else if (token) {
         dispatch(signInWithToken(token));
      }
   }, [dispatch, token, history]);
   const formik = useFormik({
      initialValues: {
         email: "juancitolopez1@gmail.com",
         password: "holamundo",
      },
      validate: (values) => {
         setVisibilityPass(false);
         const errors = {};
         if (!values.email) {
            errors.email = "Required";
         } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
         ) {
            errors.email = "Invalid email address";
         }
         if (!values.password) {
            errors.password = "Required";
         } else if (values.password.length <= 8) {
            errors.password = "Must be more than 8 characters";
         }
         return errors;
      },

      onSubmit: async ({ email, password }) => {
         console.log(email,password);
         dispatch(signInWithEmail(email, password));
      },
   });

   const handleClickShowPassword = () => {
      setVisibilityPass(!visibilityPass);
   };

   return (
      <Container component="main" maxWidth="xs">
         <CssBaseline />
         <div className={classes.paper}>
            <Avatar className={classes.avatar}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               Sign in
            </Typography>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.errors.email ? true : false}
                  helperText={
                     formik.errors.email ? "Introduce un email valido" : null
                  }
               />
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={visibilityPass ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.errors.password ? true : false}
                  helperText={
                     formik.errors.password
                        ? "Debes ingresar más de 8 caracteres"
                        : null
                  }
                  InputProps={{
                     endAdornment: (
                        <InputAdornment position="end">
                           <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                           >
                              {visibilityPass ? (
                                 <Visibility />
                              ) : (
                                    <VisibilityOff />
                                 )}
                           </IconButton>
                        </InputAdornment>
                     ),
                  }}
               ></TextField>
               <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Recordarme"
               />
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
               >
                  Ingresar
               </Button>
               <Grid container>
                  {/* <Grid item xs>
                     <Link href="/reset" variant="body2">
                        Olvidaste tu contraseña?
                     </Link>
                  </Grid> */}
                  {/* <Grid item>
                     <Link href="/auth/register" variant="body2">
                        No tienes cuenta? Registrate!
                     </Link>
                  </Grid> */}
               </Grid>
               <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
               >
                  <Grid item className={classes.icons}>
                     <IconButton
                        onClick={() => signInWithGithub()}
                        color="primary"
                        aria-label="add to shopping cart"
                     >
                        <Icon className="fab fa-github" aria-hidden="true" />
                     </IconButton>
                     <IconButton
                        onClick={() => signInWithGoogle()}
                        color="primary"
                     >
                        <Icon className="fab fa-google" aria-hidden="true" />
                     </IconButton>
                  </Grid>
               </Grid>
            </form>
         </div>
         <Box mt={8}>
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
