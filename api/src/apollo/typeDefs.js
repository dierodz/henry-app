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
      modules: [Module]
   }

   type Content {
      id: Int
      topicName: String
      durationTime: Int
      readme: String
      lessons: [Lesson]
      moduleId: Int
   }

   input contentInput {
      topicName: String!
      durationTime: Int
      readme: String!
      moduleId: Int!
      link: String
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
      contents: [Content]
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
      groups: [Group]
   }

   type Lesson {
      id: Int
      link: String
      contentId: Int
   }

   type MatesScore {
      id: Int
      name: String
      reviews: [MateReview]
   }

   type MateReview {
      id: Int
      score: Int
      commentary: String
   }

   type Post {
      id: Int
      tittle: String
      content: String
      userId: Int
      user: User
      cohorteId: Int
      groupId: Int
   }

   type Subscription {
      subscribePost(cohorteId: Int, groupId: Int): Post
   }

   type Query {
      checkPoints(
         id: Int
         name: String
         where: JSON
         limit: Int
         offset: Int
         order: JSON
      ): [CheckPoint]
      countCohortes(where: JSON, limit: Int, offset: Int, order: JSON): Int
      cohortes(
         id: Int
         where: JSON
         limit: Int
         offset: Int
         order: JSON
      ): [Cohorte]
      contents(
         topicName: String
         id: Int
         where: JSON
         limit: Int
         offset: Int
         order: JSON
      ): [Content]
      countGroups(where: JSON, limit: Int, offset: Int, order: JSON): Int
      groups(
         id: Int
         name: String
         where: JSON
         limit: Int
         offset: Int
         order: JSON
      ): [Group]
      modules(
         id: Int
         where: JSON
         limit: Int
         offset: Int
         order: JSON
      ): [Module]
      roles(id: Int, where: JSON, limit: Int, offset: Int, order: JSON): [Role]
      scores(
         id: Int
         where: JSON
         limit: Int
         offset: Int
         order: JSON
      ): [Score]
      users(id: Int, where: JSON, limit: Int, offset: Int, order: JSON): [User]
      countUsers(where: JSON, limit: Int, offset: Int, order: JSON): Int
      getUserRol(
         role: String
         where: JSON
         limit: Int
         offset: Int
         order: JSON
      ): [User]
      matesScore(
         id: Int
         name: String
         where: JSON
         limit: Int
         offset: Int
         order: JSON
      ): [MatesScore]
      mateReview(
         id: Int
         score: Int
         commentary: String
         where: JSON
         limit: Int
         offset: Int
         order: JSON
      ): [MateReview]
      getPost(
         id: Int
         where: JSON
         limit: Int
         offset: Int
         order: JSON
      ): [Post]
      getCohortePosts(
         cohorteId: Int
         where: JSON
         limit: Int
         offset: Int
         order: JSON
      ): [Post]
      getUserPosts(
         userId: Int
         where: JSON
         limit: Int
         offset: Int
         order: JSON
      ): [Post]
      getGroupPosts(
         groupId: Int
         where: JSON
         limit: Int
         offset: Int
         order: JSON
      ): [Post]
      lessons(
         id: Int
         name: String
         link: String
         readme: String
         where: JSON
         limit: Int
         offset: Int
         order: JSON
      ): [Lesson]
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
      createModule(name: String!, description: String): Module!
      updateModule(id: Int, name: String!, description: String!): Module!
      deleteModule(id: Int): DeleteResolve!

      # Mutaciones para los checkpoints
      createCheckPoint(name: String!): CheckPoint!
      updateCheckPoint(id: Int, name: String!): CheckPoint!
      deleteCheckPoint(id: Int): DeleteResolve!

      # Mutaciones para Contenidos
      createContent(input: contentInput): Content!
      updateContent(id: Int, input: contentInput): Content!
      deleteContent(id: Int): DeleteResolve!

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

      # Mutaciones para MatesScore
      createMatesScore(name: String): Score!
      updateMatesScore(id: Int, name: String): Score!
      deleteMatesScore(id: Int, name: String): DeleteResolve!

      # Mutaciones para MatesReview
      createReview(score: Int, commentary: String): Score!
      updateReview(id: Int, score: Int, commentary: String): Score!
      deleteReview(id: Int, score: Int, commentary: String): DeleteResolve!

      # Mutaciones para los posts
      createPost(
         tittle: String
         content: String
         userId: Int
         cohorteId: Int
         groupId: Int
      ): Post!
      editPost(id: Int, tittle: String, content: String): Post!
      deletePost(id: Int): DeleteResolve!

      #Mutaciones para Lessons
      createLesson(link: String!, contentId: Int!): Lesson!
      updateLesson(id: Int!, link: String!): Lesson!
      deleteLesson(id: Int!): DeleteResolve!
   }
`;

module.exports = typeDefs;
