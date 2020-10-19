import { useLazyQuery, gql, useMutation } from '@apollo/client';
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
  }, [setPage]);
  const onChangeRowsPerPage = useCallback(rows => {
    setRowsPerPage(rows);
  }, [setRowsPerPage]);
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
  const pagination = usePagination(config);
  const {
    rowsPerPage,
    page
  } = pagination;
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
    ...pagination
  };
}

let _ = t => t,
    _t,
    _t2;
const COHORTES = gql(_t || (_t = _`
  query COHORTES($where: JSON, $limit: Int, $offset: Int, $order: JSON) {
    result: cohortes(
      where: $where
      limit: $limit
      offset: $offset
      order: $order
    ) {
      id
      name
      startDate
      instructor {
        id
        givenName
        familyName
      }
      users {
        id
      }
      groups {
        id
      }
    }
    count: countCohortes(where: $where)
  }
`));
const CREATE_COHORTE = gql(_t2 || (_t2 = _`
  mutation createCohorte($name: String, $startDate: String, $instructor: Int) {
    createCohorte(
      input: { name: $name, startDate: $startDate, instructor: $instructor }
    ) {
      id
    }
  }
`));

function useCohortes(variables, config) {
  const withPagination = useQueryWithPagination(COHORTES, variables, config);
  const [_create, createObserver] = useMutation(CREATE_COHORTE);
  const create = useCallback((...args) => {
    _create(...args);
  }, []);
  const loading = useMemo(() => withPagination.loading || createObserver.loading, [withPagination.loading, createObserver.loading]);
  return { ...withPagination,
    create,
    loading
  };
}

let _$1 = t => t,
    _t$1;
const GROUPS = gql(_t$1 || (_t$1 = _$1`
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

let _$2 = t => t,
    _t$2;
const USERS = gql(_t$2 || (_t$2 = _$2`
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
  useCohortes,
  useGroups,
  usePagination,
  useUsers
};

export { index as hooks };
//# sourceMappingURL=index.modern.js.map
