import { gql } from '@apollo/client';

export const CREATE_POST= gql`
mutation createPost($tittle: String, $content: String, $userId: Int, $cohorteId: Int) {
    createPost(input: { 
      tittle: $tittle, 
      content: $content, 
      userId: $userId, 
      cohorteId: $cohorteId })
       {
      id
    }
  }
`;

export const EDIT_POST = gql`
mutation editPost(
   $id: Int
   $tittle: String
   $content: String
  ) {
   editPost(
     id: $id
     tittle: $name
     content: $content
   ) {
     id
   }
 }
`;

export const DELETE_MODULE = gql`
mutation deletePost($id: Int) {
   deletePost(id: $id) {
     message
   }
}
`;
