import React, { useEffect } from "react";
import hello from "assets/hello.svg";
import styles from "styles/pages/admin/Dashboard.module.scss";
import { Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function Dashboard() {
  const history = useHistory();

  useEffect(() => {
    history.replace(`/group/1/posts`);
  }, [history]);

  return (
    <Container className={styles.container} style={{ display: "flex" }}>
      <img src={hello} className={styles.draw} alt="" />
    </Container>
  );
}

export default Dashboard;
