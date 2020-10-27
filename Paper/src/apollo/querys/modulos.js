import { gql } from "@apollo/client";

export const GET_MODULES = gql`
  query Modulos($id: Int) {
      cohortes(id: $id){
        modules{
          id
          name
          description
          contents{
            id
            topicName
            durationTime
            readme
          }
        }
      }
  }`