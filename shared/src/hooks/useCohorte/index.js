import { useMutation } from '@apollo/client'
import { useCallback, useMemo } from 'react'
import useQueryWithPagination from '../useQueryWithPagination'
import { COHORTES, CREATE_COHORTE } from './COHORTES'

export default function useCohortes(variables, config) {
  const hook = useQueryWithPagination(COHORTES, variables, config)

  const [_create, createObserver] = useMutation(CREATE_COHORTE)

  const create = useCallback(() => {
    _create()
  }, [])

  const loading = useMemo(() => hook.loading || createObserver.loading, [
    hook.loading,
    createObserver.loading
  ])

  return { ...hook, create, loading }
}
