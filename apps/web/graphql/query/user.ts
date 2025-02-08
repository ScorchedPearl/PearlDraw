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

export const getDrawingAreaQuery=graphql(`#graphql
query GetAllDrawingAreas($room: String!) {
  getAllDrawingAreas(room: $room) {
    area
    roomId
    user {
      name
      profilePhotoURL
    }
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

export const getAllRoomsQuery=graphql(`#graphql
  query GetAllRooms {
  getAllRooms {
    slug
    tags
    admin {
      name
    }
  }
}
`)

export const checkRoomPasswordQuery=graphql(`#graphql
  query CheckRoomQuery($room: String!, $password: String!) {
  checkRoomPassword(room: $room, password: $password)
}
`)

export const sendOtpEmailQuery=graphql(`#graphql
  query SendOtpEmail($email: String!, $otp: String!) {
  sendOtpEmail(email: $email, otp: $otp)
  }
`)