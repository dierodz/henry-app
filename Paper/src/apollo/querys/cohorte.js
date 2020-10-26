import { gql } from "@apollo/client";


  export const GET_COHORTE_USER= gql`
  query user($where: JSON){
    users(where: $where) {
      cohortes{
        id
        name
      }
    }
  }
    `;