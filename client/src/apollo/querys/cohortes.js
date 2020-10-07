import { gql } from '@apollo/client';

export default gql`
  query {
    cohortes {
      id
      name
      instructor {
        givenName
      }
    }
  }
`;
