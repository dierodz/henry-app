import { gql } from '@apollo/client'

export const USERS = gql`
  query USERS($id: Int, $where: JSON, $limit: Int, $offset: Int, $order: JSON) {
    result: users(
      id: $id
      where: $where
      limit: $limit
      offset: $offset
      order: $order
    ) {
      id
      givenName
      familyName
      nickName
      email
      photoUrl
      roles {
        id
        name
      }
      cohortes {
        id
        name
      }
    }
    count: countUsers(where: $where)
  }
`
