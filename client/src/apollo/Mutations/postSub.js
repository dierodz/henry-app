import { gql } from "@apollo/client";

export const SUBSCRIBE_POST = gql`
  subscription subscribePost($cohorteId: Int, $groupId: Int) {
    subscribePost(cohorteId: $cohorteId, groupId: $groupId) {
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
  }
`;

export const GET_POST = gql`
  query getGroupPosts($groupId: Int) {
    getGroupPosts(groupId: $groupId) {
      id
      tittle
      content
      userId
    }
  }
`;
