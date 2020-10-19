import useQueryWithPagination from '../useQueryWithPagination'
import { GROUPS } from './GROUPS'
import Config from '../../types/config'

export default function useGroups(
  variables: Record<string, any>,
  config?: Config
) {
  const hook = useQueryWithPagination(GROUPS, variables, config)
  return hook
}
