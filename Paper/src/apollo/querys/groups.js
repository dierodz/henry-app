import { gql } from "@apollo/client";

export const GET_USERS_GROUP= gql`
    query users($where: JSON) {
        users(where: $where){
          id
          givenName
          familyName
          nickName
          photoUrl
          email
          groups {
            type
            name
            id
          }
        }
      }
`;
