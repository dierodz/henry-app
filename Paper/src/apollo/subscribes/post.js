import { gql } from "@apollo/client";


export const SUBSCRIBE_POST = gql`
  subscription($cohorteId: Int, $groupId:Int) {
    subscribePost(cohorteId:$cohorteId, groupId:$groupId) {
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
`;

export const GET_POST = gql`
  query($where: JSON) {
    getPost(where: $where) {
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
`;