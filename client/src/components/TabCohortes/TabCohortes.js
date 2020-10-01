import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Cohortes } from "./cohortes";
import AddIcon from "@material-ui/icons/Add";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "../../styles/components/TabCohortes.scss";

const StyledTableCell = withStyles((theme) => ({
   head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontFamily: "Trebuchet MS",
   },
   body: {
      fontSize: 14,
   },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
   root: {
      "&:nth-of-type(odd)": {
         backgroundColor: theme.palette.action.hover,
      },
   },
}))(TableRow);

const useStyles = makeStyles({
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

export default function CustomizedTables(props) {
   const classes = useStyles();
   const columnas = ["Nombre de cohorte", "Nombre del instructor"];

   return (
      <TableContainer className={classes.container} component={Paper}>
         <Table className={classes.table} aria-label="customized table">
            <TableHead>
               <TableRow>
                  {columnas.map((columna) => (
                     <StyledTableCell align="center">{columna}</StyledTableCell>
                  ))}
                  <StyledTableCell align="center">
                     <button className="addIcon">
                        <AddIcon />
                     </button>
                  </StyledTableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {Cohortes.map((el) => (
                  <StyledTableRow key={el.name}>
                     <StyledTableCell
                        align="center"
                        component="th"
                        scope="cohorte"
                     >
                        {el.name}
                     </StyledTableCell>
                     <StyledTableCell align="center">
                        {el.instructor}
                     </StyledTableCell>
                     <StyledTableCell
                        className={classes.botones}
                        align="center"
                     >
                        <button className="viewIcon">
                           <VisibilityIcon />
                        </button>
                        <button className="editIcon">
                           <EditIcon />
                        </button>
                        <button className="deleteIcon">
                           <DeleteIcon />
                        </button>
                     </StyledTableCell>
                  </StyledTableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
}
