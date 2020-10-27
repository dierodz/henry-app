import { gql } from "@apollo/client";

export const GET_USER = gql`
  query users($id: Int) {
    users(id: $id) {
      id
      email
      givenName
      familyName
      nickName
      googleId
      githubId
      photoUrl
      roles {
        id
        name
      }
      groups {
        id
        name
        type
      }
      cohortes {
        id
        name
      }
    }
  }
`;
