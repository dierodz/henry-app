import { gql } from "@apollo/client";

export const CREATE_CONTENIDO = gql`
  mutation createContenido($topicName: String!, $durationTime: Int , $readme: String, moduleId: Int) {
    mutation {
      createContent(
        input: {
          topicName: "JavaScript Avanzado 1"
          durationTime: 1
          readme: "### abcd"
          moduleId: 1
        }
      ) {
        id
        topicName
        readme
      }
    }
  }
`;

export const EDIT_CONTENIDO = gql``;

export const DELETE_CONTENIDO = gql``;
