export const queries=`#graphql
 verifyCredentialsToken(email:String!,password:String!): String
 getAllChats(room:String!): [Chat]
 getCurrentUser: User
 getAllRooms: [Room]
 checkRoomPassword(room:String!,password:String!):Boolean
 getAllDrawingAreas(room:String!):[DrawingArea]
 sendOtpEmail(email:String!,otp:String!):Boolean
`