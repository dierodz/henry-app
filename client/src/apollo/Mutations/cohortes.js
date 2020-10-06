import { gql } from '@apollo/client';

export const CREATE_COHORTE = gql`
mutation createCohorte(
   $name: String
   $number: Int
   $startDate: String
   $instructor: Int
 ) {
   createCohorte(
     name: $name
     number: $number
     startDate: $startDate
     instructor: $instructor
   ) {
     id
   }
 }
 `;
