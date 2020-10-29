import { useMutation, useQuery } from "@apollo/client";
import { Button, Grid, TextField } from "@material-ui/core";
import { GROUPS } from "apollo/querys/groups";
import { CREATE_GROUP } from "apollo/Mutations/groups";
import ProfileCard from "components/Profile/Card";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Loading from "components/Loading";

function Contact({ data: { email }, onSubmit, onlyView }) {
  const [chatId, setChatId] = useState(null);
  const history = useHistory();

  const formik = useFormik({
    initialValues: { email },
    onSubmit: onSubmit,
  });
  const [readOnly, setReadOnly] = useState(true);

  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  const allIds = [id, user.id];

  const hashIdToChat = (ids) => {
    return ids
      .sort()
      .map((e) => {
        return e.toString() + e.toString().charCodeAt(e.length / 2);
      })
      .join(ids[0] * ids[1]);
  };

  const idHasheados = hashIdToChat(allIds);

  const [createGroup, resultCreateGroup] = useMutation(CREATE_GROUP);
  const { data: preData, loading } = useQuery(GROUPS, {
    variables: {
      where: {
        name: idHasheados,
      },
    },
  });

  useEffect(() => {
    if (!loading && preData) {
      if (preData.groups.length > 0) {
        setChatId(preData.groups[0].id);
      }
    }
  }, [loading, preData]);

  useEffect(() => {
    if (!resultCreateGroup.loading && resultCreateGroup.called) {
      setChatId(resultCreateGroup);
      history.push(`/group/${resultCreateGroup.data.createGroup.id}/posts`);
    }
  }, [chatId, history, resultCreateGroup]);

  const handleOnInitChat = () => {
    if (!chatId) {
      createGroup({
        variables: { name: idHasheados, type: "pp" },
      });
    } else {
      history.push(`/group/${chatId}/posts`);
    }
  };

  if (loading) {
    return <Loading />;
  }

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
        <Grid item xs={6}>
          <Button
            fullWidth
            margin="normal"
            color="primary"
            variant="contained"
            disableElevation
            onClick={handleOnInitChat}
            style={{
              marginTop: "26px",
            }}
          >
            Escribir
          </Button>
        </Grid>
      </Grid>
    </ProfileCard>
  );
}

export default Contact;
