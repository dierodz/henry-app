import { gql } from "@apollo/client";

export const CREATE_LESSON = gql`
  mutation createLesson($link: String!, $contentId: Int!) {
    createLesson(link: $link, contentId: $contentId) {
      id
    }
  }
`;

export const UPDATE_LESSON = gql`
  mutation updateLesson($id: Int!, $link: String!) {
    updateLesson(id: $id, link: $link) {
      id
    }
  }
`;
