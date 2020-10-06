import { makeStyles } from '@material-ui/core'
const useStyles = (show) => {
  const classes = makeStyles((theme) => ({
    content: {
      flexGrow: 1,
      minHeight: 'calc(100vh - 4rem - 1px)',
      paddingLeft: theme.spacing(show ? 31 : 8),
      transition: theme.transitions.create('padding-left', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  }));
  return classes();
}

export default useStyles