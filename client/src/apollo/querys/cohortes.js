import { gql } from "@apollo/client";

export const COHORTES = gql`
  query cohortes($limit: Int, $offset: Int) {
    cohortes(limit: $limit, offset: $offset) {
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
        givenName
        familyName
        email
      }
      groups {
        id
      }
    }
  }
`;
export const COUNT_COHORTES = gql`
  query {
    countCohortes
  }
`;
export const COHORTE_BY_ID = gql`
  query COHORTES_BY_ID($id: Int) {
    cohortes(id: $id) {
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
        givenName
        familyName
        email
      }
      groups {
        id
        name
        type
        instructor {
          id
          givenName
          familyName
        }
        pms {
          id
          givenName
          familyName
        }
        students {
          id
          givenName
          familyName
        }
      }
    }
  }
`;
