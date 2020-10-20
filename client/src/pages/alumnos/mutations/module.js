import { gql } from '@apollo/client';

//Create module
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

 //Edit module:
 export const EDIT_MODULE= gql`
mutation createModule(
   $id: Integer!
 ) {
   createModule(
     name: $name
     description: $description
   ) {
     name
   }
 }
 `;

