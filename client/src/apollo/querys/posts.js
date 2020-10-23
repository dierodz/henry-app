import { gql } from "@apollo/client";

export const POSTS = gql`
  query {
    getPost {
      tittle
      content
      userId
      cohorteId
    }
  }
`;
export const COHORTE_POSTS = gql`
  query {
    getCohortePosts(cohorteId: 2) {
      id
      tittle
      content
    }
  }
  query cohortePost($cohorteId: Int) {
    getCohortePosts(cohorteId: $cohorteId) {
      id
      score
      commentary
    }
  }
`;
export const USER_POSTS = gql`
  query PorId($id: Int) {
    getPost(id: $id) {
      id
      tittle
      content
    }
  }
`;
export const GROUP_POSTS = gql`
  query getGroupPosts($groupId: Int) {
    getGroupPosts(groupId: $groupId) {
      id
      tittle
      content
      userId
    }
  }
`;
