import { gql } from "@apollo/client";

export const CREATE_LESSON = gql`
  mutation createLesson($link: String!, $contentId: Int!) {
    createLesson(link: $link, contentId: $contentId) {
      id
    }
  }
`;
