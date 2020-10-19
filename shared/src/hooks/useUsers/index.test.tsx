import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { renderHook, act } from '@testing-library/react-hooks'

import { USERS } from './USERS'

import useGroups from './index'

const data = [
  {
    result: [
      {
        id: 1,
        givenName: 'test',
        familyName: 'test',
        nickName: 'test',
        email: 'test',
        photoUrl: 'test',
        roles: {
          id: 1,
          name: 'test'
        },
        cohortes: {
          id: 1,
          name: 'test'
        }
      }
    ],
    count: 1
  }
]

const mocksApollo = [
  {
    request: {
      query: USERS,
      variables: {
        where: {
          id: 1
        },
        order: undefined,
        limit: 5,
        offset: 0
      }
    },
    result: {
      data: data[0]
    }
  }
]

function withExpect(result, test) {
  expect(result.current.count).toBe(test.count)
  expect(typeof result.current.fetch).toBe(test.fetch)
  expect(result.current.loading).toBe(test.loading)
  expect(typeof result.current.onChangePage).toBe(test.onChangePage)
  expect(typeof result.current.onChangeRowsPerPage).toBe(
    test.onChangeRowsPerPage
  )
  expect(result.current.page).toBe(test.page)
  expect(typeof result.current.refetch).toBe(test.refetch)
  expect(result.current.result).toEqual(test.result)
  expect(result.current.rowsPerPage).toBe(test.rowsPerPage)
  expect(result.current.rowsPerPageOptions).toEqual(test.rowsPerPageOptions)
}

it('useUsers hook runs correctly', async () => {
  const wrapper = ({ children }) => (
    <MockedProvider mocks={mocksApollo} addTypename={false}>
      {children}
    </MockedProvider>
  )
  const { result, waitForNextUpdate } = renderHook(
    () =>
      useGroups({
        where: {
          id: 1
        }
      }),
    {
      wrapper
    }
  )

  withExpect(result, {
    count: undefined,
    fetch: 'function',
    loading: false,
    onChangePage: 'function',
    onChangeRowsPerPage: 'function',
    page: 0,
    refetch: 'undefined',
    result: undefined,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 25, 50, 100]
  })

  act(() => {
    result.current.fetch()
  })

  await waitForNextUpdate()

  withExpect(result, {
    count: undefined,
    fetch: 'function',
    loading: true,
    onChangePage: 'function',
    onChangeRowsPerPage: 'function',
    page: 0,
    refetch: 'function',
    result: undefined,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 25, 50, 100]
  })

  await waitForNextUpdate()

  withExpect(result, {
    count: data[0].count,
    fetch: 'function',
    loading: false,
    onChangePage: 'function',
    onChangeRowsPerPage: 'function',
    page: 0,
    refetch: 'function',
    result: data[0].result,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 25, 50, 100]
  })
})
