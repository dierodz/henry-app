import { gql } from "@apollo/client";

export const CONTENTS = gql`
  query {
    contents {
      id
      topicName
      durationTime
      readme
    }
  }
`;

export const CONTENT_ID = gql`
  query contents($id: Int) {
    contents(id: $id) {
      id
      topicName
      durationTime
      readme
    }
  }
`;
