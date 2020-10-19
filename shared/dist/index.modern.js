import { useLazyQuery, gql } from '@apollo/client';
import { useState, useCallback, useMemo } from 'react';

function usePagination(config) {
  const initialValues = {
    rowsPerPageOptions: [5, 10, 25, 50, 100],
    rowsPerPage: 5,
    ...config
  };
  const [rowsPerPageOptions] = useState(initialValues.rowsPerPageOptions);
  const [rowsPerPage, setRowsPerPage] = useState(initialValues.rowsPerPage);
  const [page, setPage] = useState(0);
  const onChangePage = useCallback(page => {
    setPage(page);
  });
  const onChangeRowsPerPage = useCallback(rows => {
    setRowsPerPage(rows);
  });
  return {
    rowsPerPageOptions,
    rowsPerPage,
    page,
    onChangePage,
    onChangeRowsPerPage
  };
}

function useQueryWithPagination(QUERY_DEFINITION, variables, config) {
  const {
    where,
    order
  } = useMemo(() => ({ ...variables
  }), [variables]);
  const [execute, {
    loading,
    data,
    refetch
  }] = useLazyQuery(QUERY_DEFINITION);
  const {
    rowsPerPage,
    rowsPerPageOptions,
    page,
    onChangePage,
    onChangeRowsPerPage
  } = usePagination(config);
  const result = useMemo(() => (data === null || data === void 0 ? void 0 : data.result) || undefined, [data]);
  const count = useMemo(() => (data === null || data === void 0 ? void 0 : data.count) || undefined, [data]);
  const fetch = useCallback(() => execute({
    variables: {
      where,
      order,
      limit: rowsPerPage,
      offset: rowsPerPage * page
    }
  }), [rowsPerPage, page]);
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
  };
}

let _ = t => t,
    _t;
const GROUPS = gql(_t || (_t = _`
  query GROUPS($where: JSON, $limit: Int, $offset: Int, $order: JSON) {
    result: groups(
      where: $where
      limit: $limit
      offset: $offset
      order: $order
    ) {
      id
      name
      type
    }
    count: countGroups(where: $where)
  }
`));

function useGroups(variables, config) {
  const hook = useQueryWithPagination(GROUPS, variables, config);
  return hook;
}

let _$1 = t => t,
    _t$1;
const USERS = gql(_t$1 || (_t$1 = _$1`
  query USERS($id: Int, $where: JSON, $limit: Int, $offset: Int, $order: JSON) {
    result: users(
      id: $id
      where: $where
      limit: $limit
      offset: $offset
      order: $order
    ) {
      id
      givenName
      familyName
      nickName
      email
      photoUrl
      roles {
        id
        name
      }
      cohortes {
        id
        name
      }
    }
    count: countUsers(where: $where)
  }
`));

function useUsers(variables, config) {
  const hook = useQueryWithPagination(USERS, variables, config);
  return hook;
}

var index = {
  useGroups,
  usePagination,
  useUsers
};

export { index as hooks };
//# sourceMappingURL=index.modern.js.map
