import { gql } from '@apollo/client';


export const SUBSCRIBE_POST = gql`
  subscription subscribePost($cohorteId: Int, $groupId:Int) {
    subscribePost(cohorteId: $cohorteId, groupId:$groupId) {
      id
      tittle
      content
      user {
        givenName
        familyName
        nickName
        photoUrl
      }
    }
  }

`

/*export const SUBSCRIBE_POST = gql` 
  subscription($cohorteId: Int, $groupId:Int) {
    subscribePost(cohorteId: $cohorteId, groupId:$groupId) {
      id
      tittle
      content
      user {
        givenName
        familyName
        nickName
        photoUrl
      }
    }
  }`  
;
*/
/*export const GET_POST = gql`  
  query getPost($where: JSON) {
    getPost(where: $where) {
      id
      tittle
      content
      user {
        id
        givenName
        familyName
        nickName
        photoUrl
      }
    }
  }`  
;*/

export const GET_POST = gql`
query getPost($groupId: Int) {
    getGroupPosts(groupId: $groupId) {
      id
      tittle
      content
      userId
    user {
        id
        givenName
        familyName
        nickName
        photoUrl
     }    
    }
   }` 
