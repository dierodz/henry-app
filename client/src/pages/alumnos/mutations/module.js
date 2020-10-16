import { gql } from '@apollo/client';

export const CREATE_MODULE= gql`
mutation createModule(
   $name: String!
   $description: String!
 ) {
   createModule(
     name: $name
     description: $description
   ) {
     name
   }
 }
 `;
