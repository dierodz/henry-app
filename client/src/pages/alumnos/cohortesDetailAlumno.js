import React, { useMemo, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import { COHORTE_BY_ID } from "apollo/querys/cohortes";
import { useParams, useRouteMatch } from "react-router-dom";
import Groups from "pages/alumnos/Cohortes/groups";
import Alumns from "pages/alumnos/Cohortes/Alumns";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from "@material-ui/core";
import Loading from "components/Loading";
import "styles/components/CohortesDetailAlumno.scss"

function CohortesDetailAlumno({ className }) {
  let { id } = useParams();

  const variables = { id: parseInt(id) };

  const { loading, error, data, refetch } = useQuery(COHORTE_BY_ID, {
    variables,
  });

  // const tableData = useMemo(
  //   () => ({
  //     loading,
  //     error,
  //     data: data ? data.cohortes[0].user : data,

  //     columns: [
  //       { key: "id", label: "id", align: "left" },
  //       { key: "givenName", label: "Nombre", align: "left" },
  //       { key: "familyName", label: "Apellido", align: "left" },
  //     ],
  //   }),
  //   [
  //     data,
  //     error,
  //     loading,
  //     variables.variables,
  //   ]
  // );

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


{data && console.log(data)}
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
                <div style={{ height: "50vh", width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignItems: "center" }}>
                  <div className="cohorteDetailItem">
                    <p>Nombre del cohorte: </p> 
                 <span>{data.cohortes[0].name.toUpperCase()}</span>
                 </div>
                 <div className="cohorteDetailItem">
                 <p>Nombre del instructor: </p> 
                 <span>{capitalizeFirstLetter(data.cohortes[0].instructor.givenName) + ' ' + capitalizeFirstLetter(data.cohortes[0].instructor.familyName)}</span>
                </div>
        <div className="cohorteDetailItem">
      <p>Fecha de inicio: </p>   
      <span>{data && new Date(Number(data.cohortes[0].startDate.substring(0,data.cohortes[0].startDate.length-1))).toLocaleDateString()}</span>
      </div>
      <div className="cohorteDetailItem">
      <p>Cantidad de alumnos: </p> 
      <span>{data.cohortes[0].users.length}</span>
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
                  cohorte={data.cohortes[0]}
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
                <Alumns cohorte={data.cohortes[0]} loading={loading} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default CohortesDetailAlumno;
