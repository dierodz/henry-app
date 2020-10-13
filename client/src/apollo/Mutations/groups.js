import { gql } from "@apollo/client";

export const CREATE_GROUP = gql`
  mutation createGroup($name: String, $type: GroupTypes) {
    createGroup(input: { name: $name, type: $type }) {
      id
    }
  }
`;
