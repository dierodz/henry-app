import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Tooltip } from '@material-ui/core'
import { DashboardRounded } from '@material-ui/icons';
import Header from 'components/Header/Header'
import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';

function Admin() {
  const drawerWidth = 240;

  const [show, setShow] = useState(false)

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerPaper: {
      top: '65px',
      border: 'none'
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      paddingLeft: theme.spacing(show ? 30 : 9) + 1,
      transition: theme.transitions.create('padding-left', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <Header handleShowMenu={() => setShow(!show)} />
      <Drawer
        open={true}
        variant="persistent"
        anchor="left"
        className={[classes.drawer, show ? classes.drawerOpen : classes.drawerClose].join('')}
        classes={{
          paper: [show ? classes.drawerOpen : classes.drawerClose, classes.drawerPaper].join(' ')
        }}
      >
        <List>
          <ListItem classes={{}} button>
            <ListItemIcon>
              <Tooltip title="Dashboard" placement="right">
                <DashboardRounded />
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Switch>
          <Route exact path="/admin" component={Dashboard} />
        </Switch>
      </main>
    </div>
  )
}

export default Admin
