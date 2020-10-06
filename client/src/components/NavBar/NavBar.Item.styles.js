import { makeStyles } from '@material-ui/core'

const useStyles = () => {
  const classes = makeStyles(() => ({
    listItem: {
      borderTopRightRadius: '9999px',
      borderBottomRightRadius: '9999px',
    }
  }));
  return classes();
}

export default useStyles