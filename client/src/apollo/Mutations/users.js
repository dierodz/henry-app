import { gql } from '@apollo/client';

export const INVITE_USER = gql`
mutation inviteUser(
   $email: String!
   $role: String!
 ) {
  inviteUser(
     email: $email
     role: $role
   ) {
     id
   }
 }
 `;
