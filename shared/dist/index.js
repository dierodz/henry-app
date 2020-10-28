var client = require('@apollo/client');
var react = require('react');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

function usePagination(config) {
  var initialValues = _extends({
    rowsPerPageOptions: [5, 10, 25, 50, 100],
    rowsPerPage: 5
  }, config);

  var _useState = react.useState(initialValues.rowsPerPageOptions),
      rowsPerPageOptions = _useState[0];

  var _useState2 = react.useState(initialValues.rowsPerPage),
      rowsPerPage = _useState2[0],
      setRowsPerPage = _useState2[1];

  var _useState3 = react.useState(0),
      page = _useState3[0],
      setPage = _useState3[1];

  var onChangePage = react.useCallback(function (page) {
    setPage(page);
  }, [setPage]);
  var onChangeRowsPerPage = react.useCallback(function (rows) {
    setRowsPerPage(rows);
  }, [setRowsPerPage]);
  return {
    rowsPerPageOptions: rowsPerPageOptions,
    rowsPerPage: rowsPerPage,
    page: page,
    onChangePage: onChangePage,
    onChangeRowsPerPage: onChangeRowsPerPage
  };
}

function useQueryWithPagination(QUERY_DEFINITION, variables, config) {
  var _useMemo = react.useMemo(function () {
    return _extends({}, variables);
  }, [variables]),
      where = _useMemo.where,
      order = _useMemo.order;

  var _useLazyQuery = client.useLazyQuery(QUERY_DEFINITION),
      execute = _useLazyQuery[0],
      _useLazyQuery$ = _useLazyQuery[1],
      loading = _useLazyQuery$.loading,
      data = _useLazyQuery$.data,
      refetch = _useLazyQuery$.refetch;

  var pagination = usePagination(config);
  var rowsPerPage = pagination.rowsPerPage,
      page = pagination.page;
  var result = react.useMemo(function () {
    return (data === null || data === void 0 ? void 0 : data.result) || undefined;
  }, [data]);
  var count = react.useMemo(function () {
    return (data === null || data === void 0 ? void 0 : data.count) || undefined;
  }, [data]);
  var fetch = react.useCallback(function () {
    return execute({
      variables: {
        where: where,
        order: order,
        limit: rowsPerPage,
        offset: rowsPerPage * page
      }
    });
  }, [rowsPerPage, page]);
  return _extends({
    fetch: fetch,
    result: result,
    count: count,
    loading: loading,
    refetch: refetch
  }, pagination);
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n  mutation createCohorte($name: String, $startDate: String, $instructor: Int) {\n    createCohorte(\n      input: { name: $name, startDate: $startDate, instructor: $instructor }\n    ) {\n      id\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  query COHORTES($where: JSON, $limit: Int, $offset: Int, $order: JSON) {\n    result: cohortes(\n      where: $where\n      limit: $limit\n      offset: $offset\n      order: $order\n    ) {\n      id\n      name\n      startDate\n      instructor {\n        id\n        givenName\n        familyName\n      }\n      users {\n        id\n      }\n      groups {\n        id\n      }\n    }\n    count: countCohortes(where: $where)\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var COHORTES = client.gql(_templateObject());
var CREATE_COHORTE = client.gql(_templateObject2());

function useCohortes(variables, config) {
  var withPagination = useQueryWithPagination(COHORTES, variables, config);

  var _useMutation = client.useMutation(CREATE_COHORTE),
      _create = _useMutation[0],
      createObserver = _useMutation[1];

  var create = react.useCallback(function () {
    _create.apply(void 0, arguments);
  }, []);
  var loading = react.useMemo(function () {
    return withPagination.loading || createObserver.loading;
  }, [withPagination.loading, createObserver.loading]);
  return _extends({}, withPagination, {
    create: create,
    loading: loading
  });
}

function _templateObject$1() {
  var data = _taggedTemplateLiteralLoose(["\n  query GROUPS($where: JSON, $limit: Int, $offset: Int, $order: JSON) {\n    result: groups(\n      where: $where\n      limit: $limit\n      offset: $offset\n      order: $order\n    ) {\n      id\n      name\n      type\n    }\n    count: countGroups(where: $where)\n  }\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var GROUPS = client.gql(_templateObject$1());

function useGroups(variables, config) {
  var hook = useQueryWithPagination(GROUPS, variables, config);
  return hook;
}

function _templateObject$2() {
  var data = _taggedTemplateLiteralLoose(["\n  query USERS($id: Int, $where: JSON, $limit: Int, $offset: Int, $order: JSON) {\n    result: users(\n      id: $id\n      where: $where\n      limit: $limit\n      offset: $offset\n      order: $order\n    ) {\n      id\n      givenName\n      familyName\n      nickName\n      email\n      photoUrl\n      roles {\n        id\n        name\n      }\n      cohortes {\n        id\n        name\n      }\n    }\n    count: countUsers(where: $where)\n  }\n"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
var USERS = client.gql(_templateObject$2());

function useUsers(variables, config) {
  var hook = useQueryWithPagination(USERS, variables, config);
  return hook;
}

var index = {
  useCohortes: useCohortes,
  useGroups: useGroups,
  usePagination: usePagination,
  useUsers: useUsers
};

exports.hooks = index;
//# sourceMappingURL=index.js.map
