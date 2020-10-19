import useQueryWithPagination from '../useQueryWithPagination'
import { GROUPS } from './GROUPS'

export default function useGroups(variables, config) {
  const hook = useQueryWithPagination(GROUPS, variables, config)
  return hook
}
