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
