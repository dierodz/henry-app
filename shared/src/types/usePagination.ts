type UsePagination = {
  rowsPerPageOptions: Array<number>
  rowsPerPage: number
  page: number
  onChangePage: (page: number) => void
  onChangeRowsPerPage: (rows: number) => void
}

export default UsePagination
