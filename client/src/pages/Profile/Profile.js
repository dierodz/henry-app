import { useQuery } from "@apollo/client";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { USER_FULL } from "apollo/querys/users";
import Loading from "components/Loading";
import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import BasicInfo from "./Profile.BasicInfo";

const style = {
  AccordionActions: {
    justifyContent: "flex-end",
    padding: "16px",
    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
    background: "#f3f3f3",
  },
};

function Profile() {
  const { id } = useParams();
  const [opened, setOpened] = useState("basicInfo");
  const { data: preData, loading } = useQuery(USER_FULL, {
    variables: {
      id: parseInt(id),
    },
  });

  const data = useMemo(() => {
    return preData?.users[0] || undefined;
  }, [preData]);

  if (loading) return <Loading />;

  if (!data) return <div>no data</div>;

  return (
    <div style={{ height: "calc(100vh - 65px)" }}>
      <Container maxWidth="sm">
        <Grid container>
          <Grid item xs={12}>
            <Typography component="div">
              <Box fontSize="h5.fontSize" m={2}>
                Mi perfil
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid container item xs={12} spacing={2}>
            {data && <BasicInfo data={data} />}
            <Accordion
              expanded={opened === "geographicInfo"}
              onChange={() => setOpened("geographicInfo")}
              variant="outlined"
              style={{ width: "100%" }}
            >
              <AccordionSummary>
                <Typography color="textSecondary" gutterBottom>
                  Datos geográficos
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      label="Pais"
                      value="Uruguay"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      label="Provincia / Estado / Departamento"
                      value="Canelónes"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      label="Ciudad"
                      value="Canelónes"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      label="Barrio"
                      value="Canelónes"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      label="Dirección"
                      value="Canelónes"
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
              <AccordionActions style={style.AccordionActions}>
                <Button variant="outlined">Editar</Button>
              </AccordionActions>
            </Accordion>
            <Accordion
              expanded={opened === "contact"}
              onChange={() => setOpened("contact")}
              variant="outlined"
              style={{ width: "100%" }}
            >
              <AccordionSummary>
                <Typography color="textSecondary" gutterBottom>
                  Contacto
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      label="Email"
                      value="Diego"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      label="Teléfono"
                      value="Rodrríguez"
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
              <AccordionActions style={style.AccordionActions}>
                <Button variant="outlined">Editar</Button>
              </AccordionActions>
            </Accordion>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Profile;
