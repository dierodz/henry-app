import { gql } from '@apollo/client'

export const GROUPS = gql`
  query GROUPS($where: JSON, $limit: Int, $offset: Int, $order: JSON) {
    result: groups(
      where: $where
      limit: $limit
      offset: $offset
      order: $order
    ) {
      id
      name
      type
    }
    count: countGroups(where: $where)
  }
`
