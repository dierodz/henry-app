import { useMutation, useQuery } from "@apollo/client";
import PostCard from "components/PostCard";
import React, { useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { GET_POST, SUBSCRIBE_POST } from "apollo/Mutations/postSub";
import Loading from "components/Loading";
import { Button, makeStyles, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import { CREATE_POST } from "apollo/Mutations/posts";
import { useSelector } from "react-redux";

export const Post = () => {
  const ref = useRef(null);

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

  useEffect(() => {
    if (ref.current) {
      window.scroll({ top: ref.current.clientHeight });
    }
  }, [preData, ref]);

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validate: (values) => {
      const errors = {};

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
    <div ref={ref}>
      <div className={classes.Postcontainer}>
        {data && data.map((post) => <PostCard key={post.id} {...post} />)}
      </div>

      <div className={classes.container}>
        <div className={classes.paper}>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <div className={classes.inputContainer}>
              <div className={classes.input}>
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
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Postea
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0px",
  },
  form: {
    // width: "100vh", // Fix IE 11 issue.
    marginTop: theme.spacing(0),
  },
  submit: {
    marginBottom: theme.spacing(1, 0, 1),
    width: "15%",
    height: "140px",
  },
  icons: {
    margin: theme.spacing(0, 0, 0),
  },
  contenido: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: "20px 0",
    alignItems: "center",
    width: "100vh",
    marginLeft: "60px",
  },
  input: {
    width: "85%",
    paddingRight: "10px",
    paddingBottom: "7px",
  },
  container: {
    position: "fixed",
    background: "white",
    zIndex: 1,
    right: 0,
    bottom: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    wrap: "wrap",
  },
  Postcontainer: {
    marginBottom: "200px",
  },
}));
