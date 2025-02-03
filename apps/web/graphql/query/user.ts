import { graphql } from "gql";

export const getAllChatsQuery = graphql(`#graphql
 query GetAllChats($room: String!) {
  getAllChats(room: $room) {
    message
    user {
      name
      profilePhotoURL
    }
    createdAt
  }
}
`)

export const verifyCredentialsTokenQuery = graphql(`#graphql
query Query($email: String!, $password: String!) {
  verifyCredentialsToken(email: $email, password: $password)
}
`)

export const getCurrentUserQuery = graphql(`#graphql
 query GetCurrentUser {
  getCurrentUser {
    name
    profilePhotoURL
    email
    id
  }
}
`)