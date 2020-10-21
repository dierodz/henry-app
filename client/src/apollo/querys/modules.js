import { gql } from "@apollo/client";

export const MODULES = gql`
  query modules {
    modules {
      id
      name
      description
    }
  }
`;

export const MODULES_BY_ID = gql`
  query modules($id: Int!) {
    modules(id: $id) {
      id
      name
      contents {
        id
        topicName
        durationTime
        readme
      }
    }
  }
`;
