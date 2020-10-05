import { makeStyles } from '@material-ui/core'
const drawerWidth = 240;
const useStyles = (show) => {
  const classes = makeStyles((theme) => ({
    content: {
      flexGrow: 1,
      minHeight: 'calc(100vh - 4rem - 1px)',
      paddingLeft: theme.spacing(show ? 30 : 9) + 1,
      transition: theme.transitions.create('padding-left', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  }));
  return classes();
}

export default useStyles