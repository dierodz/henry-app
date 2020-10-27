import { gql } from "@apollo/client";

  export const CREATE_POST= gql`
  mutation createPost($tittle:String, $content:String, $userId:Int, $groupId:Int){
    createPost(tittle:$tittle,content:$content,userId:$userId,groupId:$groupId){
      id
    }
  }
    `;