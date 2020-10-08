import { gql } from '@apollo/client';

export default gql`
  query {
    cohortes {
      id
      name
      startDate
      instructor {
        id
        givenName
        familyName
      }
    }
  }
`;
