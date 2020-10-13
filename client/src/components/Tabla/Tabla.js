import React from "react";
import {
  Button,
  ButtonGroup,
  useMediaQuery,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import DialogDel from "./DialogDel";
import TableDialog from "./TableDialog";
import empty from "assets/empty.svg";
import {
  StyledAddButton,
  StyledTableCell,
  StyledTableRow,
  useStyles,
} from "./style";
import styles from "./Tabla.module.scss";
import "../../styles/components/TabCohortes.scss";
import { Add, Delete, Edit, Visibility } from "@material-ui/icons";
import Loading from "components/Loading";

export default function Tabla({ loading, data, columnas, info }) {
  const classes = useStyles();
  const [openDel, setOpenDel] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDelClickOpen = (id) => {
    setOpenDel(id);
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

  const handleEditClickOpen = (id) => {
    setOpenEdit(id);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  return (
    <>
      <TableContainer className={classes.container}>
        {loading && <Loading />}
        {data.data && data.data.length > 0 ? (
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                {data.columns.map(({ key, label, align }) => (
                  <StyledTableCell key={key} align={align}>
                    {label}
                  </StyledTableCell>
                ))}
                <StyledTableCell align="right">
                  {data.actions && data.actions.create && (
                    <Button
                      variant="outlined"
                      startIcon={<Add />}
                      onClick={handleAddClickOpen}
                    >
                      {data.addButtonLabel}
                    </Button>
                  )}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((el, i) => (
                <StyledTableRow key={i}>
                  {data.columns.map(({ key, align, component }) => (
                    <StyledTableCell
                      align={align}
                      component="th"
                      //scope="cohorte"
                      key={key}
                    >
                      {component ? component(el) : el[key]}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell align="right">
                    {data.actions && (
                      <ButtonGroup>
                        {data.actions.view && (
                          <Button
                            onClick={() => data.actions.view.onSubmit(el.id)}
                          >
                            <Visibility />
                          </Button>
                        )}
                        {data.actions.update && (
                          <Button onClick={() => handleEditClickOpen(el.id)}>
                            <Edit />
                          </Button>
                        )}
                        {data.actions.delete && (
                          <Button onClick={() => handleDelClickOpen(el.id)}>
                            <Delete />
                          </Button>
                        )}
                      </ButtonGroup>
                    )}
                  </StyledTableCell>
                  <DialogDel
                    opened={openDel === el.id}
                    onClose={handleDelClose}
                    onSubmit={() => data.actions.delete.onSubmit(el.id)}
                    fullScreen={fullScreen}
                  />
                  {data.actions && data.actions.update && (
                    <TableDialog
                      opened={openEdit === el.id}
                      onClose={handleEditClose}
                      context={{
                        ...data.actions.update,
                        initialValues: el,
                      }}
                    />
                  )}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          !loading && (
            <div className={styles.empty}>
              <img src={empty} alt="sin datos" />
              <div className={styles.info}>
                {data.actions?.create && (
                  <StyledAddButton
                    size="large"
                    startIcon={<Add />}
                    onClick={handleAddClickOpen}
                  >
                    {data.addButtonLabel}
                  </StyledAddButton>
                )}
              </div>
            </div>
          )
        )}
        {data.actions && data.actions.create && (
          <TableDialog
            opened={openAdd}
            onClose={handleAddClose}
            context={data.actions.create}
          />
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={32}
        rowsPerPage={5}
        page={1}
        onChangePage={() => null}
        onChangeRowsPerPage={() => null}
      />
    </>
  );
}
