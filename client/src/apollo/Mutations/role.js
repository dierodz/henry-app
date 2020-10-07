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

 export const EDIT_ROLE= gql`

 `;

 export const DELETE_ROLE= gql`

 `;
