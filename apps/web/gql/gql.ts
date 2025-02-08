/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "#graphql\n mutation CreateCredentialsToken($email: String!, $password: String!, $name: String!) {\n  createCredentialsToken(email: $email, password: $password, name: $name)\n}\n": typeof types.CreateCredentialsTokenDocument,
    "#graphql\n mutation CreateRoom($slug: String!, $password: String!, $tags: [String]) {\n  createRoom(slug: $slug, password: $password, tags: $tags) {\n    slug\n    password\n    tags\n  }\n}\n": typeof types.CreateRoomDocument,
    "#graphql\n mutation VerifyGoogleToken($token: String!) {\n  verifyGoogleToken(token: $token)\n}\n": typeof types.VerifyGoogleTokenDocument,
    "#graphql\n  mutation ChangePassword($email: String!, $newPassword: String!) {\n  changePassword(email: $email, newPassword: $newPassword)\n}\n": typeof types.ChangePasswordDocument,
    "#graphql\n query GetAllChats($room: String!) {\n  getAllChats(room: $room) {\n    message\n    user {\n      name\n      profilePhotoURL\n    }\n    createdAt\n  }\n}\n": typeof types.GetAllChatsDocument,
    "#graphql\nquery GetAllDrawingAreas($room: String!) {\n  getAllDrawingAreas(room: $room) {\n    area\n    roomId\n    user {\n      name\n      profilePhotoURL\n    }\n  }\n}\n": typeof types.GetAllDrawingAreasDocument,
    "#graphql\nquery Query($email: String!, $password: String!) {\n  verifyCredentialsToken(email: $email, password: $password)\n}\n": typeof types.QueryDocument,
    "#graphql\n query GetCurrentUser {\n  getCurrentUser {\n    name\n    profilePhotoURL\n    email\n    id\n  }\n}\n": typeof types.GetCurrentUserDocument,
    "#graphql\n  query GetAllRooms {\n  getAllRooms {\n    slug\n    tags\n    admin {\n      name\n    }\n  }\n}\n": typeof types.GetAllRoomsDocument,
    "#graphql\n  query CheckRoomQuery($room: String!, $password: String!) {\n  checkRoomPassword(room: $room, password: $password)\n}\n": typeof types.CheckRoomQueryDocument,
    "#graphql\n  query SendOtpEmail($email: String!, $otp: String!) {\n  sendOtpEmail(email: $email, otp: $otp)\n  }\n": typeof types.SendOtpEmailDocument,
};
const documents: Documents = {
    "#graphql\n mutation CreateCredentialsToken($email: String!, $password: String!, $name: String!) {\n  createCredentialsToken(email: $email, password: $password, name: $name)\n}\n": types.CreateCredentialsTokenDocument,
    "#graphql\n mutation CreateRoom($slug: String!, $password: String!, $tags: [String]) {\n  createRoom(slug: $slug, password: $password, tags: $tags) {\n    slug\n    password\n    tags\n  }\n}\n": types.CreateRoomDocument,
    "#graphql\n mutation VerifyGoogleToken($token: String!) {\n  verifyGoogleToken(token: $token)\n}\n": types.VerifyGoogleTokenDocument,
    "#graphql\n  mutation ChangePassword($email: String!, $newPassword: String!) {\n  changePassword(email: $email, newPassword: $newPassword)\n}\n": types.ChangePasswordDocument,
    "#graphql\n query GetAllChats($room: String!) {\n  getAllChats(room: $room) {\n    message\n    user {\n      name\n      profilePhotoURL\n    }\n    createdAt\n  }\n}\n": types.GetAllChatsDocument,
    "#graphql\nquery GetAllDrawingAreas($room: String!) {\n  getAllDrawingAreas(room: $room) {\n    area\n    roomId\n    user {\n      name\n      profilePhotoURL\n    }\n  }\n}\n": types.GetAllDrawingAreasDocument,
    "#graphql\nquery Query($email: String!, $password: String!) {\n  verifyCredentialsToken(email: $email, password: $password)\n}\n": types.QueryDocument,
    "#graphql\n query GetCurrentUser {\n  getCurrentUser {\n    name\n    profilePhotoURL\n    email\n    id\n  }\n}\n": types.GetCurrentUserDocument,
    "#graphql\n  query GetAllRooms {\n  getAllRooms {\n    slug\n    tags\n    admin {\n      name\n    }\n  }\n}\n": types.GetAllRoomsDocument,
    "#graphql\n  query CheckRoomQuery($room: String!, $password: String!) {\n  checkRoomPassword(room: $room, password: $password)\n}\n": types.CheckRoomQueryDocument,
    "#graphql\n  query SendOtpEmail($email: String!, $otp: String!) {\n  sendOtpEmail(email: $email, otp: $otp)\n  }\n": types.SendOtpEmailDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n mutation CreateCredentialsToken($email: String!, $password: String!, $name: String!) {\n  createCredentialsToken(email: $email, password: $password, name: $name)\n}\n"): (typeof documents)["#graphql\n mutation CreateCredentialsToken($email: String!, $password: String!, $name: String!) {\n  createCredentialsToken(email: $email, password: $password, name: $name)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n mutation CreateRoom($slug: String!, $password: String!, $tags: [String]) {\n  createRoom(slug: $slug, password: $password, tags: $tags) {\n    slug\n    password\n    tags\n  }\n}\n"): (typeof documents)["#graphql\n mutation CreateRoom($slug: String!, $password: String!, $tags: [String]) {\n  createRoom(slug: $slug, password: $password, tags: $tags) {\n    slug\n    password\n    tags\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n mutation VerifyGoogleToken($token: String!) {\n  verifyGoogleToken(token: $token)\n}\n"): (typeof documents)["#graphql\n mutation VerifyGoogleToken($token: String!) {\n  verifyGoogleToken(token: $token)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  mutation ChangePassword($email: String!, $newPassword: String!) {\n  changePassword(email: $email, newPassword: $newPassword)\n}\n"): (typeof documents)["#graphql\n  mutation ChangePassword($email: String!, $newPassword: String!) {\n  changePassword(email: $email, newPassword: $newPassword)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n query GetAllChats($room: String!) {\n  getAllChats(room: $room) {\n    message\n    user {\n      name\n      profilePhotoURL\n    }\n    createdAt\n  }\n}\n"): (typeof documents)["#graphql\n query GetAllChats($room: String!) {\n  getAllChats(room: $room) {\n    message\n    user {\n      name\n      profilePhotoURL\n    }\n    createdAt\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\nquery GetAllDrawingAreas($room: String!) {\n  getAllDrawingAreas(room: $room) {\n    area\n    roomId\n    user {\n      name\n      profilePhotoURL\n    }\n  }\n}\n"): (typeof documents)["#graphql\nquery GetAllDrawingAreas($room: String!) {\n  getAllDrawingAreas(room: $room) {\n    area\n    roomId\n    user {\n      name\n      profilePhotoURL\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\nquery Query($email: String!, $password: String!) {\n  verifyCredentialsToken(email: $email, password: $password)\n}\n"): (typeof documents)["#graphql\nquery Query($email: String!, $password: String!) {\n  verifyCredentialsToken(email: $email, password: $password)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n query GetCurrentUser {\n  getCurrentUser {\n    name\n    profilePhotoURL\n    email\n    id\n  }\n}\n"): (typeof documents)["#graphql\n query GetCurrentUser {\n  getCurrentUser {\n    name\n    profilePhotoURL\n    email\n    id\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetAllRooms {\n  getAllRooms {\n    slug\n    tags\n    admin {\n      name\n    }\n  }\n}\n"): (typeof documents)["#graphql\n  query GetAllRooms {\n  getAllRooms {\n    slug\n    tags\n    admin {\n      name\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query CheckRoomQuery($room: String!, $password: String!) {\n  checkRoomPassword(room: $room, password: $password)\n}\n"): (typeof documents)["#graphql\n  query CheckRoomQuery($room: String!, $password: String!) {\n  checkRoomPassword(room: $room, password: $password)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query SendOtpEmail($email: String!, $otp: String!) {\n  sendOtpEmail(email: $email, otp: $otp)\n  }\n"): (typeof documents)["#graphql\n  query SendOtpEmail($email: String!, $otp: String!) {\n  sendOtpEmail(email: $email, otp: $otp)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;