// import React, { useEffect, useState } from 'react'
// import { useMutation, useQuery } from "@apollo/client";
// import {
//     CREATE_MODULE,
// } from "../mutations/module";

// import { MODULES } from "../querys/module";

// function Modules() {

//     return (
//         <Grid container spacing={1}>
//   <Grid container item xs={12} spacing={3}>
//     <FormRow />
//   </Grid>
//   <Grid container item xs={12} spacing={3}>
//     <FormRow />
//   </Grid>
//   <Grid container item xs={12} spacing={3}>
//     <FormRow />
//   </Grid>
// </Grid>
//     )
// }

// export default Modules;

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';

import { useMutation, useQuery } from "@apollo/client";
import {
    CREATE_MODULE,
} from "../mutations/module";

import { MODULES } from "../querys/module";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flex: '1 0 auto',
    margin: theme.spacing(1),
  },
}));

function BreakpointUp(props) {
  const classes = useStyles();
  const { width } = props;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Hidden xlUp>
        <Paper className={classes.paper}> <a href={"www.google.com"}>MODULO 1</a></Paper>   
        </Hidden>
        <Hidden xlUp>
          <Paper className={classes.paper}>MODULO 2222</Paper>
        </Hidden>
        <Hidden xlUp>
          <Paper className={classes.paper}>MODULO 3</Paper>
        </Hidden>
        <Hidden xlUp>
          <Paper className={classes.paper}>MODULO 4</Paper>
        </Hidden>
      </div>
    </div>
  );
}

BreakpointUp.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(BreakpointUp);