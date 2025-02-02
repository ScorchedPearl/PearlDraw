export const mutations=`#graphql
    verifyGoogleToken(token:String!): String
    createCredentialsToken(email:String!,password:String!,name:String!): String
    createRoom(slug:String!,password:String!):Room
`