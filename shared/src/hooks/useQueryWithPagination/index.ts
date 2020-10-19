import {
  DocumentNode,
  OperationVariables,
  TypedDocumentNode,
  useLazyQuery
} from '@apollo/client'
import { useCallback, useMemo } from 'react'
import usePagination from '../usePagination'
import Config from '../../types/config'
import UseQueryWithPagination from '../../types/useQueryWithPagination'

export default function useQueryWithPagination<T = any>(
  QUERY_DEFINITION: DocumentNode | TypedDocumentNode<any, Record<string, any>>,
  variables: OperationVariables,
  config: Config
): UseQueryWithPagination<T> {
  const { where, order } = useMemo(() => ({ ...variables }), [variables])
  const [execute, { loading, data, refetch }] = useLazyQuery(QUERY_DEFINITION)
  const pagination = usePagination(config)
  const { rowsPerPage, page } = pagination
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
    ...pagination
  }
}
