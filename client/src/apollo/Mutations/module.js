import { gql } from "@apollo/client";

export const CREATE_MODULE = gql`
  mutation createModule($name: String!, $description: String) {
    createModule(name: $name, description: $description) {
      id
    }
  }
`;

export const EDIT_MODULE = gql`
  mutation updateModule($id: Int, $name: String, $description: String) {
    updateModule(id: $id, name: $name, description: $description) {
      id
    }
  }
`;

export const DELETE_MODULE = gql`
  mutation deleteModule($id: Int) {
    deleteModule(id: $id) {
      message
    }
  }
`;

export const GET_ALL_MODULES = gql`
  mutation getAllModule($name: String, $description: String) {
    getAllModule(name: $name, description: $description) {
      names
      description
    }
  }
`;