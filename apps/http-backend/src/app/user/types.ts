export interface CreateCredentialsTokenType{
 email:String,
 password:String,
 name:String,
}
export interface VerifyCredentialsTokenType{
 email:String,
 password:String,
}
export interface CreateRoomType{
 slug:String,
 password:String,
}
export const Types=`#graphql
type Room{
 id:ID!
 slug:String!
 password:String!
 createdAt: String!
 updatedAt: String!
 adminId: String!
}
type Chat{
 id:ID!
 message:String!
 createdAt: String!
 updatedAt: String!
 roomId: String!
 userId: String!
 user: User!
}
type User{
 id:ID!
 email:String!
 name:String!
 profilePhotoURL:String
}
`
