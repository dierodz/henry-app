import { gql } from "@apollo/client";

export const CREATE_CONTENT = gql`
  mutation createContent(
    $topicName: String!
    $durationTime: Int
    $readme: String!
    $moduleId: Int!
  ) {
    createContent(
      input: {
        topicName: $topicName
        durationTime: $durationTime
        readme: $readme
        moduleId: $moduleId
      }
    ) {
      id
      topicName
      readme
    }
  }
`;
