import { gql } from '@apollo/client'

export const getUserRol = gql`
  query UserByRole($role: String) {
    getUserRol(role: $role) {
      id
      givenName
      familyName
      roles {
        name
      }
    }
  }
`