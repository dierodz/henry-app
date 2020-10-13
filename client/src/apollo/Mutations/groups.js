import { gql } from "@apollo/client";

export const CREATE_GROUP = gql`
  mutation createGroup($name: String, $type: GroupTypes) {
    createGroup(input: { name: $name, type: $type }) {
      id
    }
  }
`;

export const UPDATE_GROUP = gql`
  mutation updateGroup($id: Int, $name: String, $type: GroupTypes) {
    updateGroup(
        id: $id,
        name: $name, 
        type: $type        
    ) {
      id
    }
  }
`;

export const DELETE_GROUP = gql`
mutation deleteGroup($id: Int, $name: String) {
  deleteGroup(
      id: $id,
      name: $name, 
             
    ) {
    message
  }
}
`;
