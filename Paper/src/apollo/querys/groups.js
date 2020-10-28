import { gql } from "@apollo/client";

export const GET_USERS_GROUP = gql`
  query users($where: JSON) {
    users(where: $where) {
      givenName
      familyName
      photoUrl
      groups {
        type
        name
        id
      }
    }
  }
`;
