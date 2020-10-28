import { renderHook, act } from '@testing-library/react-hooks'

import { hooks } from '../../index'

const { usePagination } = hooks

function withExpect(result, test) {
  expect(typeof result.current.onChangePage).toBe(test.onChangePage)
  expect(typeof result.current.onChangeRowsPerPage).toBe(
    test.onChangeRowsPerPage
  )
  expect(result.current.page).toBe(test.page)
  expect(result.current.rowsPerPage).toBe(test.rowsPerPage)
  expect(result.current.rowsPerPageOptions).toEqual(test.rowsPerPageOptions)
}

it('useUsers hook runs correctly', async () => {
  const { result } = renderHook(() =>
    usePagination({
      where: {
        cohorteId: 2
      }
    })
  )

  withExpect(result, {
    onChangePage: 'function',
    onChangeRowsPerPage: 'function',
    page: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 25, 50, 100]
  })

  act(() => {
    result.current.onChangePage(1)
  })

  withExpect(result, {
    onChangePage: 'function',
    onChangeRowsPerPage: 'function',
    page: 1,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 25, 50, 100]
  })

  act(() => {
    result.current.onChangeRowsPerPage(50)
  })

  withExpect(result, {
    onChangePage: 'function',
    onChangeRowsPerPage: 'function',
    page: 1,
    rowsPerPage: 50,
    rowsPerPageOptions: [5, 10, 25, 50, 100]
  })
})
