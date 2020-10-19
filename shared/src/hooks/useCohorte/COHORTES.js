import { gql } from '@apollo/client'

export const COHORTES = gql`
  query COHORTES($where: JSON, $limit: Int, $offset: Int, $order: JSON) {
    result: cohortes(
      where: $where
      limit: $limit
      offset: $offset
      order: $order
    ) {
      id
      name
      startDate
      instructor {
        id
        givenName
        familyName
      }
      users {
        id
      }
      groups {
        id
      }
    }
    count: countCohortes(where: $where)
  }
`
export const CREATE_COHORTE = gql`
  mutation createCohorte($name: String, $startDate: String, $instructor: Int) {
    createCohorte(
      input: { name: $name, startDate: $startDate, instructor: $instructor }
    ) {
      id
    }
  }
`
