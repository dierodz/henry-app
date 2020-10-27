import { ApolloQueryResult, QueryLazyOptions } from '@apollo/client'
import UsePagination from './usePagination'

interface UseQueryWithPagination<T> extends UsePagination {
  fetch: (options?: QueryLazyOptions<Record<string, any>>) => void
  result: Array<T>
  count: number | undefined
  loading: boolean
  refetch: (
    variables?: Partial<Record<string, any>>
  ) => Promise<ApolloQueryResult<any>>
}

export default UseQueryWithPagination
