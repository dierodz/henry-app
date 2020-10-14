import { gql } from '@apollo/client';

export const CREATE_ROLE= gql`
mutation createRole(
   $name: String
 
 ) {
   createRole(
      name: $name
   ) {
     id
   }
 }
 `;

export const ADD_ROLE=gql`
mutation addRoleToUser(
  $email: String!
  $roleName: String!
) {
  addRoleToUser(
    email: $email
    roleName: $roleName
  ) {
    id,
    email
  }
}
` 
export const REMOVE_ROLE=gql`
mutation RemoveRoleToUser(
  $email: String!
  $roleName: String!
) {
  RemoveRoleToUser(
    email: $email
    roleName: $roleName
  ) {
    id,
    email
  }
}
` 
