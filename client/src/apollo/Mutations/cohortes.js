import { gql } from '@apollo/client';

export const CREATE_COHORTE = gql`
mutation createCohorte(
   $name: String
   $startDate: String
   $instructor: Int
 ) {
   createCohorte(
     name: $name
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
   $startDate: String
   $instructor: Int
 ) {
   editCohorte(
     id: $id
     name: $name
     startDate: $startDate
     instructor: $instructor
   ) {
     id
   }
 }
  `;
