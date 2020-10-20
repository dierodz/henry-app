import { gql } from "@apollo/client";

export const INVITE_USER = gql`
  mutation inviteUser($email: String!, $role: String!) {
    inviteUser(email: $email, role: $role) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation userUpdate($id: Int, $user: UserInput) {
    updateUser(id: $id, input: $user) {
      id
    }
  }
`;

export const ADD_USER_TO_GROUP = gql`
mutation addUsersToGroups($id: Int, $name: String, $group: GroupInput) {
  addUsersToGroups(id: $id, name: $name, input: $group) {
    id
    name
    type
    parent
    instructor {
      id
      nickName
      familyName
      givenName
    }
    pms {
      id
      nickName
      familyName
      givenName
    }
    staff {
      id
      nickName
      familyName
      givenName
    }
    students {
      id
      nickName
      familyName
      givenName
    }
  }
}
`;
