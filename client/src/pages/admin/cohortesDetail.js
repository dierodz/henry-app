import React, { /*  useMemo, */ useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { COHORTE_BY_ID } from "apollo/querys/cohortes";
import {
  ADD_USER_TO_COHORTE,
  DELETE_USER_TO_COHORTE,
} from "apollo/Mutations/cohortes";
import { useParams } from "react-router-dom";
import Groups from "./Cohortes/groups";
import Alumns from "./Cohortes/Alumns";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from "@material-ui/core";
import Loading from "components/Loading";
import "styles/components/CohortesDetail.scss";

function CohortesDetail({ className }) {
  let { id } = useParams();

  const [/* addUsersToCohorteMutation, */ resultCreate] = useMutation(
    ADD_USER_TO_COHORTE
  );
  const [/* deleteUsersToCohorteMutation, */ resultDelete] = useMutation(
    DELETE_USER_TO_COHORTE
  );

  const variables = { id: parseInt(id) };

  const { loading, data, refetch } = useQuery(COHORTE_BY_ID, {
    variables,
  });

  useEffect(() => {
    if (!resultCreate.loading && resultCreate.called) {
      refetch();
    }
  }, [resultCreate, refetch]);

  useEffect(() => {
    if (!resultDelete.loading && resultDelete.called) {
      refetch();
    }
  }, [resultDelete, refetch]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <Container style={{ paddingTop: "1rem" }}>
      {loading ? (
        <Loading />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card variant="outlined">
              <CardHeader title="Información" />
              <CardContent>
                <div
                  style={{
                    height: "50vh",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <div className="cohorteDetailItem">
                    <p>Nombre del cohorte: </p>
                    <span>{data && data.cohortes[0].name.toUpperCase()}</span>
                  </div>
                  <div className="cohorteDetailItem">
                    <p>Nombre del instructor: </p>
                    <span>
                      {data &&
                        capitalizeFirstLetter(
                          data.cohortes[0].instructor.givenName
                        ) +
                          " " +
                          capitalizeFirstLetter(
                            data.cohortes[0].instructor.familyName
                          )}
                    </span>
                  </div>
                  <div className="cohorteDetailItem">
                    <p>Fecha de inicio: </p>
                    <span>
                      {data &&
                        new Date(
                          Number(data.cohortes[0].startDate)
                        ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="cohorteDetailItem">
                    <p>Cantidad de alumnos: </p>
                    <span>{data && data.cohortes[0].users.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card variant="outlined" style={{ position: "relative" }}>
              <CardHeader title="Grupos" />
              <CardContent>
                <Groups
                  cohorte={data && data.cohortes[0]}
                  loading={loading}
                  onRefetch={refetch}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card variant="outlined" style={{ position: "relative" }}>
              <CardHeader title="Alumnos" />
              <CardContent>
                <Alumns cohorte={data && data.cohortes[0]} loading={loading} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default CohortesDetail;
