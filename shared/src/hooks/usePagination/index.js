import { useCallback, useState } from 'react'

export default function usePagination(config) {
  const initialValues = {
    rowsPerPageOptions: [5, 10, 25, 50, 100],
    rowsPerPage: 5,
    ...config
  }
  const [rowsPerPageOptions] = useState(initialValues.rowsPerPageOptions)
  const [rowsPerPage, setRowsPerPage] = useState(initialValues.rowsPerPage)
  const [page, setPage] = useState(0)
  const onChangePage = useCallback((page) => {
    setPage(page)
  })
  const onChangeRowsPerPage = useCallback((rows) => {
    setRowsPerPage(rows)
  })

  return {
    rowsPerPageOptions,
    rowsPerPage,
    page,
    onChangePage,
    onChangeRowsPerPage
  }
}
