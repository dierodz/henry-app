import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    flex: "1 0 auto",
    margin: theme.spacing(1),
  },
}));

function BreakpointUp() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Hidden xlUp>
          <Paper className={classes.paper}>
            {" "}
            <Link to="/student/modules/modulo1">Modulo 1</Link>{" "}
          </Paper>
        </Hidden>
        <Hidden xlUp>
          <Paper className={classes.paper}>
            <Link to="/student/modules/modulo2">Modulo 2</Link>
          </Paper>
        </Hidden>
        <Hidden xlUp>
          <Paper className={classes.paper}>
            <Link to="/student/modules/modulo3">Modulo 3</Link>
          </Paper>
        </Hidden>
        <Hidden xlUp>
          <Paper className={classes.paper}>
            <Link to="/student/modules/modulo4">Modulo 4</Link>
          </Paper>
        </Hidden>
      </div>
    </div>
  );
}

BreakpointUp.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};

export default withWidth()(BreakpointUp);
