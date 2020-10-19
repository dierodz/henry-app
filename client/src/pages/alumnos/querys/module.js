import { gql } from "@apollo/client";

export const MODULES = gql`
  query modules($limit: Int, $offset: Int) {
    modules(limit: $limit, offset: $offset) {
      name
      description
    }
  }
`;