import { gql } from '@apollo/client'

export const getUserRol = gql`
  query UserByRole($role: String) {
    getUserRol(role: $role) {
      givenName
      familyName
      roles {
        name
      }
    }
  }
`