import { graphql } from "gql";

export const createCredentialsTokenMutation = graphql(`#graphql
 mutation CreateCredentialsToken($email: String!, $password: String!, $name: String!) {
  createCredentialsToken(email: $email, password: $password, name: $name)
}
`)
export const createRoomMutation = graphql(`#graphql
 mutation CreateRoom($slug: String!, $password: String!, $tags: [String]) {
  createRoom(slug: $slug, password: $password, tags: $tags) {
    slug
    password
    tags
  }
}
`)
export const verifyGoogleTokenMutation = graphql(`#graphql
 mutation VerifyGoogleToken($token: String!) {
  verifyGoogleToken(token: $token)
}
`)

export const changePasswordMutation = graphql(`#graphql
  mutation ChangePassword($email: String!, $newPassword: String!) {
  changePassword(email: $email, newPassword: $newPassword)
}
`)