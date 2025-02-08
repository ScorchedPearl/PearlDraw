/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Chat = {
  __typename?: 'Chat';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  roomId: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type DrawingArea = {
  __typename?: 'DrawingArea';
  area?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  roomId?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword?: Maybe<Scalars['Boolean']['output']>;
  createCredentialsToken?: Maybe<Scalars['String']['output']>;
  createRoom?: Maybe<Room>;
  verifyGoogleToken?: Maybe<Scalars['String']['output']>;
};


export type MutationChangePasswordArgs = {
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};


export type MutationCreateCredentialsTokenArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCreateRoomArgs = {
  password: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationVerifyGoogleTokenArgs = {
  token: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  checkRoomPassword?: Maybe<Scalars['Boolean']['output']>;
  getAllChats?: Maybe<Array<Maybe<Chat>>>;
  getAllDrawingAreas?: Maybe<Array<Maybe<DrawingArea>>>;
  getAllRooms?: Maybe<Array<Maybe<Room>>>;
  getCurrentUser?: Maybe<User>;
  sendOtpEmail?: Maybe<Scalars['Boolean']['output']>;
  verifyCredentialsToken?: Maybe<Scalars['String']['output']>;
};


export type QueryCheckRoomPasswordArgs = {
  password: Scalars['String']['input'];
  room: Scalars['String']['input'];
};


export type QueryGetAllChatsArgs = {
  room: Scalars['String']['input'];
};


export type QueryGetAllDrawingAreasArgs = {
  room: Scalars['String']['input'];
};


export type QuerySendOtpEmailArgs = {
  email: Scalars['String']['input'];
  otp: Scalars['String']['input'];
};


export type QueryVerifyCredentialsTokenArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Room = {
  __typename?: 'Room';
  admin?: Maybe<User>;
  adminId: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  password: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  tags: Array<Maybe<Scalars['String']['output']>>;
  updatedAt: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  profilePhotoURL?: Maybe<Scalars['String']['output']>;
};

export type CreateCredentialsTokenMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type CreateCredentialsTokenMutation = { __typename?: 'Mutation', createCredentialsToken?: string | null };

export type CreateRoomMutationVariables = Exact<{
  slug: Scalars['String']['input'];
  password: Scalars['String']['input'];
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', createRoom?: { __typename?: 'Room', slug: string, password: string, tags: Array<string | null> } | null };

export type VerifyGoogleTokenMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifyGoogleTokenMutation = { __typename?: 'Mutation', verifyGoogleToken?: string | null };

export type ChangePasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword?: boolean | null };

export type GetAllChatsQueryVariables = Exact<{
  room: Scalars['String']['input'];
}>;


export type GetAllChatsQuery = { __typename?: 'Query', getAllChats?: Array<{ __typename?: 'Chat', message: string, createdAt: string, user: { __typename?: 'User', name: string, profilePhotoURL?: string | null } } | null> | null };

export type GetAllDrawingAreasQueryVariables = Exact<{
  room: Scalars['String']['input'];
}>;


export type GetAllDrawingAreasQuery = { __typename?: 'Query', getAllDrawingAreas?: Array<{ __typename?: 'DrawingArea', area?: string | null, roomId?: string | null, user?: { __typename?: 'User', name: string, profilePhotoURL?: string | null } | null } | null> | null };

export type QueryQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type QueryQuery = { __typename?: 'Query', verifyCredentialsToken?: string | null };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'User', name: string, profilePhotoURL?: string | null, email: string, id: string } | null };

export type GetAllRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRoomsQuery = { __typename?: 'Query', getAllRooms?: Array<{ __typename?: 'Room', slug: string, tags: Array<string | null>, admin?: { __typename?: 'User', name: string } | null } | null> | null };

export type CheckRoomQueryQueryVariables = Exact<{
  room: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type CheckRoomQueryQuery = { __typename?: 'Query', checkRoomPassword?: boolean | null };

export type SendOtpEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
  otp: Scalars['String']['input'];
}>;


export type SendOtpEmailQuery = { __typename?: 'Query', sendOtpEmail?: boolean | null };


export const CreateCredentialsTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCredentialsToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCredentialsToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}]}}]} as unknown as DocumentNode<CreateCredentialsTokenMutation, CreateCredentialsTokenMutationVariables>;
export const CreateRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]} as unknown as DocumentNode<CreateRoomMutation, CreateRoomMutationVariables>;
export const VerifyGoogleTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyGoogleToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyGoogleToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}]}]}}]} as unknown as DocumentNode<VerifyGoogleTokenMutation, VerifyGoogleTokenMutationVariables>;
export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}]}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const GetAllChatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllChats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"room"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllChats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"room"},"value":{"kind":"Variable","name":{"kind":"Name","value":"room"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhotoURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetAllChatsQuery, GetAllChatsQueryVariables>;
export const GetAllDrawingAreasDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllDrawingAreas"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"room"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllDrawingAreas"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"room"},"value":{"kind":"Variable","name":{"kind":"Name","value":"room"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhotoURL"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllDrawingAreasQuery, GetAllDrawingAreasQueryVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyCredentialsToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhotoURL"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetAllRoomsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllRooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllRooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllRoomsQuery, GetAllRoomsQueryVariables>;
export const CheckRoomQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckRoomQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"room"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkRoomPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"room"},"value":{"kind":"Variable","name":{"kind":"Name","value":"room"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<CheckRoomQueryQuery, CheckRoomQueryQueryVariables>;
export const SendOtpEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SendOtpEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otp"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendOtpEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"otp"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otp"}}}]}]}}]} as unknown as DocumentNode<SendOtpEmailQuery, SendOtpEmailQueryVariables>;