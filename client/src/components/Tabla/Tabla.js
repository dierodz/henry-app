import React from "react";
import { StyledAddButton, StyledTableCell, StyledTableRow, useStyles } from "./style";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "../../styles/components/TabCohortes.scss";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import DialogAdd from "./DialogAdd";
import DialogDel from "./DialogDel";
import DialogEdit from "./DialogEdit";
import empty from 'assets/empty.svg';
import styles from './Tabla.module.scss';
import { Button } from "@material-ui/core";

export default function Tabla({ data, columnas, info }) {
   const classes = useStyles();
   const [openDel, setOpenDel] = React.useState(false);
   const theme = useTheme();
   const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

   const handleDelClickOpen = () => {
      setOpenDel(true);
   };

   const handleDelClose = () => {
      setOpenDel(false);
   };

   const [openAdd, setOpenAdd] = React.useState(false);

   const handleAddClickOpen = () => {
      setOpenAdd(true);
   };

   const handleAddClose = () => {
      setOpenAdd(false);
   };

   const [openEdit, setOpenEdit] = React.useState(false);

   const handleEditClickOpen = () => {
      setOpenEdit(true);
   };

   const handleEditClose = () => {
      setOpenEdit(false);
   };

   console.log(data.data)

   return (
      <TableContainer className={classes.container} component={Paper}>
         <Table className={classes.table} aria-label="customized table">
            <TableHead>
               <TableRow>
                  {data.columns.map(({ key, label, align }) => (
                     <StyledTableCell key={key} align={align}>
                        {label}
                     </StyledTableCell>
                  ))}
                  <StyledTableCell align="right">
                     <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddClickOpen}>
                        {data.addButtonLabel}
                     </Button>
                  </StyledTableCell>
               </TableRow>
            </TableHead>
            {data.data && data.data.length > 0 ?
               <TableBody>
                  {data.data.map((el, i) => (
                     <StyledTableRow key={i}>
                        {data.columns.map(({ key, align }) => (
                           <StyledTableCell
                              align={align}
                              component="th"
                              //scope="cohorte"
                              key={key}
                           >
                              {el[key]}
                           </StyledTableCell>
                        ))}
                        <StyledTableCell
                           className={classes.botones}
                           align="center"
                        >
                           <button className="viewIcon">
                              <VisibilityIcon />
                           </button>
                           <button
                              className="editIcon"
                              onClick={handleEditClickOpen}
                           >
                              <EditIcon />
                           </button>
                           <button
                              className="deleteIcon"
                              onClick={handleDelClickOpen}
                           >
                              <DeleteIcon />
                           </button>
                        </StyledTableCell>
                     </StyledTableRow>
                  ))}
               </TableBody> :
               <TableBody>
                  <StyledTableRow>
                     <td className={styles.empty} colSpan={data.columns.length + 1}>
                        <img src={empty} alt="sin datos" />
                        <div className={styles.info} >
                           <StyledAddButton size="large" startIcon={<AddIcon />} onClick={handleAddClickOpen}>
                              {data.addButtonLabel}
                           </StyledAddButton>
                        </div>
                     </td>
                  </StyledTableRow>
               </TableBody>
            }
         </Table>
         <DialogDel
            openDel={openDel}
            handleDelClose={handleDelClose}
            fullScreen={fullScreen}
         />
         <DialogAdd
            columnas={columnas}
            openAdd={openAdd}
            handleAddClose={handleAddClose}
         />
         <DialogEdit
            columnas={columnas}
            openEdit={openEdit}
            handleEditClose={handleEditClose}
         />
      </TableContainer>
   );
}
