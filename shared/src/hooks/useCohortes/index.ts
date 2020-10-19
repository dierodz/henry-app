import { useMutation } from '@apollo/client'
import { useCallback, useMemo } from 'react'
import useQueryWithPagination from '../useQueryWithPagination'
import { COHORTES, CREATE_COHORTE } from './COHORTES'
import Config from '../../types/config'
import Cohorte from '../../types/Cohorte'

export { default as Cohorte } from '../../types/Cohorte'

export default function useCohortes(
  variables: Record<string, any>,
  config?: Config
) {
  const withPagination = useQueryWithPagination<Cohorte>(
    COHORTES,
    variables,
    config
  )

  const [_create, createObserver] = useMutation(CREATE_COHORTE)

  const create = useCallback((...args) => {
    _create(...args)
  }, [])

  const loading = useMemo(
    () => withPagination.loading || createObserver.loading,
    [withPagination.loading, createObserver.loading]
  )

  return { ...withPagination, create, loading }
}
