import { gql } from "@apollo/client";

export const CREATE_CONTENT = gql`
  mutation createContent(
    $topicName: String!
    $durationTime: Int
    $readme: String!
    $moduleId: Int!
    $link: String
  ) {
    createContent(
      input: {
        topicName: $topicName
        durationTime: $durationTime
        readme: $readme
        moduleId: $moduleId
        link: $link
      }
    ) {
      id
      topicName
      readme
    }
  }
`;

export const UPDATE_CONTENT = gql`
  mutation updateContent(
    $id: Int
    $topicName: String!
    $durationTime: Int
    $readme: String!
    $moduleId: Int!
  ) {
    updateContent(
      id: $id
      input: {
        topicName: $topicName
        durationTime: $durationTime
        readme: $readme
        moduleId: $moduleId
      }
    ) {
      id
    }
  }
`;

export const DELETE_CONTENT = gql`
  mutation deleteContent($id: Int) {
    deleteContent(id: $id) {
      message
    }
  }
`;
