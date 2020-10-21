import { gql } from "@apollo/client";

export const GROUPS = gql`
  query groups($where: JSON, $limit: Int, $offset: Int, $order: JSON) {
    groups(where: $where, limit: $limit, offset: $offset, order: $order) {
      id
      name
      type
      students {
        id
        givenName
        familyName
        email
      }
    }
  }
`;

export const COUNT_GROUPS = gql`
  query countGroups($where: JSON) {
    countGroups(where: $where)
  }
`;
