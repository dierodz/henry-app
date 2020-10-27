import { gql } from "@apollo/client";

export const getUserRol = gql`
  query UserByRole($role: String) {
    getUserRol(role: $role) {
      id
      givenName
      familyName
      email
      roles {
        name
      }
      groups {
        name
      }
      cohortes {
        name
      }
    }
  }
`;
export const COUNT_USERS = gql`
  query countUsers($where: JSON) {
    countUsers(where: $where)
  }
`;
export const USER_FULL = gql`
  query userFull(
    $id: Int
    $where: JSON
    $limit: Int
    $offset: Int
    $order: JSON
  ) {
    users(
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
      groups {
        id
        name
        type
        students {
          id
          givenName
          familyName
          nickName
          email

        }
      }
    }
  }
`;
