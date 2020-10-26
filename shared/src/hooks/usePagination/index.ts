import { useCallback, useState } from 'react'
import Config from '../../types/config'
import UsePagination from '../../types/usePagination'

export default function usePagination(config: Config): UsePagination {
  const initialValues = {
    rowsPerPageOptions: [5, 10, 25, 50, 100],
    rowsPerPage: 5,
    ...config
  }
  const [rowsPerPageOptions] = useState(initialValues.rowsPerPageOptions)
  const [rowsPerPage, setRowsPerPage] = useState(initialValues.rowsPerPage)
  const [page, setPage] = useState(0)
  const onChangePage = useCallback(
    (page: number) => {
      setPage(page)
    },
    [setPage]
  )
  const onChangeRowsPerPage = useCallback(
    (rows: number) => {
      setRowsPerPage(rows)
    },
    [setRowsPerPage]
  )

  return {
    rowsPerPageOptions,
    rowsPerPage,
    page,
    onChangePage,
    onChangeRowsPerPage
  }
}
