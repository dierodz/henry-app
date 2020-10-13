import { gql } from "@apollo/client";

export const CREATE_COHORTE = gql`
   mutation createCohorte($name: String, $startDate: String, $instructor: Int) {
      createCohorte(
         input: { name: $name, startDate: $startDate, instructor: $instructor }
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
         input: {
            id: $id
            name: $name
            startDate: $startDate
            instructor: $instructor
         }
      ) {
         id
      }
   }
`;
export const ADD_USER_TO_COHORTE = gql`
   mutation addUsersToCohorte(
   $cohorteId: Int!, 
   $userId: [Int]!
   ) {
      addUsersToCohorte(
      cohorteId: $cohorteId, 
      userId: $userId
      ) {
         id
      }
   }
`;

export const DELETE_USER_TO_COHORTE = gql`
   mutation removeUsersFromCohorte(
   $cohorteId: Int!, 
   $userId: [Int]!
   ) {
      removeUsersFromCohorte(
      cohorteId: $cohorteId, 
      userId: $userId
      ) {
         id
      }
   }
`;