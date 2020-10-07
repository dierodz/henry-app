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

 export const DELETE_COHORTE = gql`
 mutation deleteCohorte($id: Int) {
   deleteCohorte(id: $id) {
     message
   }
 }
 `;

 export const EDIT_COHORTE = gql`
 mutation editCohorte(
   $id: Int
   $name: String
   $number: Int
   $startDate: String
   $instructor: Int
 ) {
   editCohorte(
     id: $id
     name: $name
     number: $number
     startDate: $startDate
     instructor: $instructor
   ) {
     id
   }
 }
  `;
