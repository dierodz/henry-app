import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

export const StyledTableCell = withStyles((theme) => ({
   head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontFamily: "Trebuchet MS",
   },
   body: {
      fontSize: 14,
   },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
   root: {
      "&:nth-of-type(odd)": {
         backgroundColor: theme.palette.action.hover,
      },
   },
}))(TableRow);

export const useStyles = makeStyles({
   table: {
      maxWidth: 900,
   },
   container: {
      maxWidth: 900,
   },
   botones: {
      display: "flex",
      justifyContent: "space-evenly",
   },
});
