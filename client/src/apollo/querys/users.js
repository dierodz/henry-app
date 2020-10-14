import { gql } from "@apollo/client";

export const getUserRol = gql`
  query UserByRole($role: String) {
    getUserRol(role: $role) {
      id
      givenName
      familyName
      roles {
        name
      }
    }
  }
`;

export const USER_FULL = gql`
  query userFull($id: Int) {
    users(id: $id) {
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
    }
  }
`;
