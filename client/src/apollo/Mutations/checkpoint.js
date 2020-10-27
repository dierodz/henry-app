import { gql } from "@apollo/client";

export const CREATE_CHECKPOINT = gql`
  mutation createCheckpoint($name: String!) {
    createCheckPoint(name: $name) {
      id
    }
  }
`;

export const EDIT_CHECKPOINT = gql`
  mutation updateCheckpoint($id: Int, $name: String!) {
    updateCheckPoint(id: $id, name: $name) {
      id
    }
  }
`;

export const DELETE_CHECKPOINT = gql`
  mutation deleteCheckpoint($id: Int) {
    deleteCheckPoint(id: $id) {
      message
    }
  }
`;
