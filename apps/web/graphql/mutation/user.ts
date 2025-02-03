import { graphql } from "gql";

export const createCredentialsTokenMutation = graphql(`#graphql
 mutation CreateCredentialsToken($email: String!, $password: String!, $name: String!) {
  createCredentialsToken(email: $email, password: $password, name: $name)
}
`)
export const createRoomMutation = graphql(`#graphql
 mutation CreateRoom($slug: String!, $password: String!) {
  createRoom(slug: $slug, password: $password) {
    slug
    updatedAt
    password
    id
    adminId
    createdAt
  }
}
`)
export const verifyGoogleTokenMutation = graphql(`#graphql
 mutation VerifyGoogleToken($token: String!) {
  verifyGoogleToken(token: $token)
}
`)