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
