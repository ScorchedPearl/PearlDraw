export interface CreateCredentialsTokenType{
 email:String,
 password:String,
 name:String,
}
export interface VerifyCredentialsTokenType{
 email:String,
 password:String,
}
export const Types=`#graphql
type Room{
 id:ID!
 slug:String!
 createdAt: String!
 updatedAt: String!
 adminId: String
}
`
