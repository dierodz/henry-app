const { gql } = require("apollo-server-express");

const typeDefs = gql`
   type CheckPoint {
      id: Int
      name: String
   }

   type Cohorte {
      id: Int
      name: String
      number: Int
   }

   type Content {
      id: Int
      topicName: String
      durationTime: Int
   }

   enum GroupTypes {
      PP
      StandUp
      General
   }

   type Group {
      id: Int
      name: String
      type: GroupTypes
   }

   type Module {
      id: Int
      name: String
      description: String
   }

   enum RoleTypes {
      instructor
      pm
      student
      staff
   }

   type Role {
      id: Int
      name: RoleTypes
   }

   type Score {
      id: Int
      score: Int
   }

   type User {
      id: Int
      givenName: String
      familyName: String
      nickName: String
      email: String
      googleId: String
      githubId: String
      photoUrl: String
      roles: [Role]
   }

   type Query {
      checkPoints(name: String): [CheckPoint]
      cohortes(name: String): [Cohorte]
      contents(topicName: String): [Content]
      groups(id: Int): [Group]
      modules(id: Int): [Module]
      roles(name: String): [Role]
      scores(id: Int): [Score]
      users(id: Int): [User]
   }

   input UserInput {
      givenName: String
      familyName: String
      nickName: String
      email: String
      googleId: String
      githubId: String
      photoUrl: String
   }

   type Mutations {
      createUser(input: UserInput): User!
      editUser(input: UserInput): User!
      deleteUser(id: Int): String!
   }
`;

module.exports = typeDefs;
