import { gql } from '@apollo/client';

export const CREATE_CONTENIDO= gql`
mutation createContenido(
   $topicName: String!
   $durationTime: Int
 ) {
   createContenido(
      topicName: $topicName
      durationTime: $durationTime
   ) {
     id
   }
 }
 `;

 export const EDIT_CONTENIDO= gql`

 `;

 export const DELETE_CONTENIDO= gql`

 `;
