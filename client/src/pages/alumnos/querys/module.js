import { gql } from "@apollo/client";

//Get all modules.
export const MODULES = gql`
  query modules($limit: Int, $offset: Int) {
    modules(limit: $limit, offset: $offset) {
        topicName
        durationTime
        readme
    }
  }
`;

