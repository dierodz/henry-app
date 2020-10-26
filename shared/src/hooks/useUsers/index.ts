import useQueryWithPagination from '../useQueryWithPagination'
import { USERS } from './USERS'

export default function useUsers(variables, config) {
  const hook = useQueryWithPagination(USERS, variables, config)
  return hook
}
