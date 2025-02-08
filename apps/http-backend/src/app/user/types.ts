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
 tags:String[]
}
export interface CheckRoomPasswordType{
 password:String,
 room:String,
}
export interface DrawingArea{
 id:String,
 area:String,
 roomId:String,
 userId:String,
}
export const Types=`#graphql
type Room{
 id:ID!
 slug:String!
 password:String!
 createdAt: String!
 updatedAt: String!
 adminId: String!
 tags:[String]!
 admin:User
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
type DrawingArea{
 id:String,
 area:String,
 roomId:String,
 userId:String,
 user:User,
}
`
