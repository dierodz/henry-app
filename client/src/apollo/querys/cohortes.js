import { gql } from '@apollo/client';

export default gql`
  query {
    cohortes {
      id
      name
      number
      startDate
      instructor {
        id
        givenName
        familyName
      }
    }
  }
`;
