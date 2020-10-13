import { gql } from '@apollo/client';

export const COHORTES = gql`
  query {
    cohortes {
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
  }
`;

export const COHORTE_BY_ID = gql`
  query COHORTES_BY_ID($id: Int) {
    cohortes(id: $id) {
      users {
        id
        givenName
        familyName
      }
    }
  }
`;


