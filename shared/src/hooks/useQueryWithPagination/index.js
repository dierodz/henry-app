import { useLazyQuery } from '@apollo/client'
import { useCallback, useMemo } from 'react'
import usePagination from '../usePagination'

export default function useQueryWithPagination(
  QUERY_DEFINITION,
  variables,
  config
) {
  const { where, order } = useMemo(() => ({ ...variables }), [variables])
  const [execute, { loading, data, refetch }] = useLazyQuery(QUERY_DEFINITION)
  const {
    rowsPerPage,
    rowsPerPageOptions,
    page,
    onChangePage,
    onChangeRowsPerPage
  } = usePagination(config)
  const result = useMemo(() => data?.result || undefined, [data])
  const count = useMemo(() => data?.count || undefined, [data])
  const fetch = useCallback(
    () =>
      execute({
        variables: {
          where,
          order,
          limit: rowsPerPage,
          offset: rowsPerPage * page
        }
      }),
    [rowsPerPage, page]
  )
  return {
    fetch,
    result,
    count,
    loading,
    refetch,
    rowsPerPage,
    rowsPerPageOptions,
    page,
    onChangePage,
    onChangeRowsPerPage
  }
}
