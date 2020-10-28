import { useMutation, useQuery } from "@apollo/client";
import PostCard from "components/PostCard";
import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { GET_POST, SUBSCRIBE_POST } from "apollo/Mutations/postSub";
import Loading from "components/Loading";
import { Button, Container, makeStyles, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import { CREATE_POST } from "apollo/Mutations/posts";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: '10px'
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
  dialogo: {
    width: "68vh",
    height: '50vh',
    display: 'inline-block',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: '5px',
    paddingBottom: '5px',
    position: 'relative',
    scrollPadding: 'auto',
    overflowY: 'scroll',
    scrollHeight: '50'


  },
contenido: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',


}
}));

export const Post = () => {
  const { id } = useParams();
  const classes = useStyles();
  const { user } = useSelector((state) => state.auth);

  const [createPost] = useMutation(CREATE_POST);
  //suscripciones
  const { groupId } = React.useMemo(() => ({ groupId: parseInt(id) }), [id]);
  //const groupId =  parseInt(id)

  const { data: preData, loading, subscribeToMore } = useQuery(GET_POST, {
    variables: { groupId },
  });
  //use effect para la suscripcion

  useEffect(
    () => {
      subscribeToMore({
        document: SUBSCRIBE_POST,
        variables: { groupId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          return Object.assign({}, prev, {
            getGroupPosts: [
              ...prev.getGroupPosts,
              subscriptionData.data.subscribePost,
            ],
          });
        },
      });
    },
    [groupId, subscribeToMore],
    preData
  );

  const formik = useFormik({
    initialValues: {
      tittle: "",
      content: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.tittle) {
        errors.tittle = "Required";
      }

      if (!values.content) {
        errors.content = "Required";
      }
      return errors;
    },

    onSubmit: async ({ content, tittle }, { resetForm }) => {
      createPost({
        variables: {
          content,
          tittle,
          userId: parseInt(user.id),
          groupId: parseInt(id),
        },
      });

      resetForm();
    },
  });

  // mapeo de los datos recibidos
  const data = useMemo(() => {
    if (preData && preData) {
      const laData = preData.getGroupPosts.map((post) => ({
        id: post?.id,
        title: post?.tittle,
        content: post?.content,
        userId: post?.userId,
      }));

      return laData;
    }
  }, [preData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
    <div className={classes.contenido} >
    <div className={classes.dialogo}  >
      {data && data.map((post) => 
        <PostCard key={post.id} {...post} />)}
       </div>
       </div>
      <Container component="main" maxWidth="xs"  >

        <div className={classes.paper}>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="tittle"
              label="Titulo"
              name="tittle"
              autoFocus
              value={formik.values.tittle}
              onChange={formik.handleChange}
              error={formik.errors.tittle ? true : false}
              helperText={
                formik.errors.tittle ? "Introduce un título valido" : null
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="content"
              label="Contenido"
              type={"text"}
              id="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              error={formik.errors.content ? true : false}
              helperText={
                formik.errors.content ? "Debes ingresar el contenido" : null
              }
            ></TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Crear
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};
