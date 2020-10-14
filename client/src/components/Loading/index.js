import {
  Container,
  LinearProgress as MDLinearProgress,
  Typography,
  withStyles,
} from "@material-ui/core";
import React from "react";
import draw from "assets/loading.svg";

const LinearProgress = withStyles((theme) => ({
  colorPrimary: {
    backgroundColor: "#1e1e1e",
  },
  bar: {
    backgroundColor: "#ffff01",
  },
}))(MDLinearProgress);

function Loading() {
  return (
    <>
      <LinearProgress
        style={{ position: "fixed", top: 0, left: 0, right: 0 }}
      />
      <Container>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "fit-content",
            margin: "0 auto",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
          }}
        >
          <img
            src={draw}
            alt=""
            style={{
              width: "25vw",
              height: "25vh",
            }}
          />
          <Typography
            variant="h5"
            gutterBottom
            style={{
              textAlign: "center",
            }}
          >
            aguardando datos...
          </Typography>
        </div>
      </Container>
    </>
  );
}

export default Loading;
