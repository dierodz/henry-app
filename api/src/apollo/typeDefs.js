const { gql } = require("apollo-server-express");

const typeDefs = gql`
   scalar JSON

   type CheckPoint {
      id: Int
      name: String
   }

   type Cohorte {
      id: Int
      name: String
      startDate: String
      instructor: User
      users: [User]
      groups: [Group]
   }

   type Content {
      id: Int
      topicName: String
      durationTime: Int
   }

   enum GroupTypes {
      pp
      standup
      general
   }

   type Group {
      id: Int
      name: String
      type: GroupTypes
      instructor: User
      pms: [User]
      staff: [User]
      students: [User]
      parent: Int
   }

   input GroupInput {
      name: String
      type: GroupTypes
      instructorId: Int
      pmId: [Int]
      staffId: [Int]
      studentId: [Int]
   }

   type Module {
      id: Int
      name: String
      description: String
   }

   type Role {
      id: Int
      name: String
   }

   type Score {
      id: Int
      score: Float
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
      cohortes: [Cohorte]
   }

   type Query {
      checkPoints(id: Int, name: String): [CheckPoint]
      countCohortes(where: JSON): Int
      cohortes(
         id: Int
         where: JSON
         limit: Int
         offset: Int
         order: JSON
      ): [Cohorte]
      contents(topicName: String): [Content]
      countGroups(where: JSON): Int
      groups(
         id: Int
         name: String
         where: JSON
         limit: Int
         offset: Int
         order: JSON
      ): [Group]
      modules(id: Int): [Module]
      roles(id: Int): [Role]
      scores(id: Int): [Score]
      users(id: Int, where: JSON, limit: Int, offset: Int, order: JSON): [User]
      countUsers(where: JSON): Int
      getUserRol(role: String): [User]
   }

   # Estos son los datos que acepta un usuario
   input UserInput {
      givenName: String
      familyName: String
      nickName: String
      email: String
      googleId: String
      githubId: String
      photoUrl: String
      password: String
      role: String
      roles: [String]
   }

   # Esto es tl tipo objeto que arroja cuando se elimina un registro
   type DeleteResolve {
      message: String!
   }

   type Error {
      message: String
      type: String
      code: Int
   }

   type ErrorMessage {
      name: String
      type: String
      error: Error
   }

   input CohorteInput {
      id: Int
      name: String
      startDate: String
      instructor: Int
   }

   type Mutation {
      # Mutaciones para usuarios
      createUser(input: UserInput): User!
      updateUser(id: Int, input: UserInput): User!
      deleteUser(id: Int): DeleteResolve!
      inviteUser(email: String!, role: String!): User
      addRoleToUser(email: String!, roleName: String!): User
      removeRoleToUser(email: String!, roleName: String!): User

      # Mutations Cohorte
      createCohorte(input: CohorteInput): Cohorte!
      editCohorte(input: CohorteInput): Cohorte!
      deleteCohorte(id: Int): DeleteResolve!
      addUsersToCohorte(cohorteId: Int!, userId: [Int]!): Cohorte!
      removeUsersFromCohorte(cohorteId: Int!, userId: [Int]!): Cohorte!
      addGroupsToCohorte(cohorteId: Int!, groupId: [Int]!): Cohorte!
      removeGroupsFromCohorte(cohorteId: Int!, groupId: [Int]!): Cohorte!

      # Mutaciones para los modulos
      createModule(name: String!): Module!
      updateModule(id: Int, name: String!, description: String!): Module!
      deleteModule(id: Int): DeleteResolve!

      # Mutaciones para los checkpoints
      createCheckPoint(name: String!): CheckPoint!
      updateCheckPoint(id: Int, name: String!): CheckPoint!
      deleteCheckPoint(id: Int): DeleteResolve!

      # Mutaciones para Contenidos
      createContenido(topicName: String!, durationTime: Int): Content!
      updateTopics(id: Int, topic: String!): Content!
      deleteTopics(id: Int): DeleteResolve!

      # Mutaciones para Roles
      createRole(name: String): Role!
      updateRole(id: Int, name: String): Role!
      deleteRole(id: Int, name: String): DeleteResolve!

      # Mutaciones para Scores
      createScore(score: Float): Score!
      updateScore(id: Int, score: Float): Score!
      deleteScore(id: Int): DeleteResolve!

      # Mutaciones pra Groups
      createGroup(input: GroupInput): Group!
      updateGroup(id: Int, name: String, type: GroupTypes): Group!
      deleteGroup(id: Int, name: String): DeleteResolve!
      removeUsersOfGroups(id: Int!, name: String, userId: [Int]!): Group!
      addUsersToGroups(id: Int, name: String, input: GroupInput): Group!
      setParentToGroup(parendId: Int, sonId: Int): Group!
   }
`;

module.exports = typeDefs;
