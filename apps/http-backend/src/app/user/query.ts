export const queries=`#graphql
 verifyCredentialsToken(email:String!,password:String!): String
 getAllChats(room:String!): [Chat]
 getCurrentUser: User
`