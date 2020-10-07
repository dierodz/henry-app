import { gql } from '@apollo/client';

export const CREATE_SCORE= gql`
mutation createScore(
   $score: Float
 
 ) {
   createScore(
      score: $score
   ) {
     id
   }
 }
 `;

 export const EDIT_SCORE= gql`
 mutation updateScore(
   $id: Int
   $score: Float
 
 ) {
   updateScore(
      id: $id
      score: $score
   ) {
     id
   }
 }
 `;

 export const DELETE_SCORE= gql`
 mutation deleteScore(
   $id: Int
 
 ) {
   deleteScore(
      id: $id
   ) {
     message
   }
 }
 `;
