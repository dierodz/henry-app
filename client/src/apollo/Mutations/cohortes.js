import { gql } from '@apollo/client';

export const CREATE_COHORTE = gql`
mutation createCohorte(
   $name: String
   $number: Int
   $starDate: String
   $instructor: Int
 ) {
   createCohorte(
     name: $name
     number: $number
     starDate: $starDate
     instructor: $instructor
   ) {
     id
   }
 }
 `;
