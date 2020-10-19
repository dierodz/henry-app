import { useMutation, useQuery } from "@apollo/client";
import {
  Avatar,
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { UPDATE_USER } from "apollo/Mutations/users";
import { USER_FULL } from "apollo/querys/users";
import Loading from "components/Loading";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BasicInfo from "./Profile.BasicInfo";
import Contact from "./Profile.Contact";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
}));

function Profile() {
  const classes = useStyles();
  const { id } = useParams();
  const { uid } = useSelector((store) => store.auth);
  const { data: preData, loading, refetch } = useQuery(USER_FULL, {
    variables: {
      id: parseInt(id) || parseInt(uid),
    },
  });
  const [update, updateResponse] = useMutation(UPDATE_USER);
  const data = preData?.users[0] ? { 
    ...preData?.users[0],
    __typename: preData?.users[0].__typename,
    cohortes: preData?.users[0].cohortes,
    email: preData?.users[0].email,
    familyName: capitalizeFirstLetter(preData?.users[0].familyName),
    givenName: capitalizeFirstLetter(preData?.users[0].givenName),
    id: preData?.users[0].id,
    nickName: preData?.users[0].nickName,
    photoUrl: preData?.users[0].photoUrl,
    roles: preData?.users[0].roles
   } : undefined;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async function handleUpdate(values) {
    await update({
      variables: {
        id: data.id || uid,
        user: { ...values },
      },
    });
    refetch();
  }

  if (loading) return <Loading />;
  else if (updateResponse.loading) return <Loading />;

  if (!data) return <div>no data</div>;

  return (
    <div style={{ height: "calc(100vh - 65px)" }}>
      <Container maxWidth="sm" style={{ padding: "1rem" }}>
        <Grid container>
          <Grid container item xs={12} spacing={2}>
            <Grid item container xs={12} justify="center">
              {data && (
                <Avatar className={classes.avatar} src={data.photoUrl} />
              )}
            </Grid>
            <Grid item xs={12}>
              {data && (
                <BasicInfo
                  onSubmit={handleUpdate}
                  data={data}
                  onlyView={id ? true : false}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {data && (
                <Contact
                  onSubmit={handleUpdate}
                  data={data}
                  onlyView={id ? true : false}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Profile;
