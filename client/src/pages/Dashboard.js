import React from "react";
import hello from "assets/hello.svg";
import styles from "styles/pages/admin/Dashboard.module.scss";
import { Container } from "@material-ui/core";

function Dashboard() {
  return (
    <Container className={styles.container} style={{ display: "flex" }}>
      <img src={hello} className={styles.draw} alt="" />
    </Container>
  );
}

export default Dashboard;
