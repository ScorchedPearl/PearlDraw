import {  useQuery } from "@tanstack/react-query"
import {  GetAllChatsQuery, GetAllChatsQueryVariables, GetAllDrawingAreasQuery, GetAllDrawingAreasQueryVariables, GetAllRoomsQuery, GetAllRoomsQueryVariables, GetCurrentUserQuery} from "gql/graphql";
import {  getAllChatsQuery, getAllRoomsQuery, getCurrentUserQuery, getDrawingAreaQuery } from "graphql/query/user";
import { graphqlClient } from "useCases/Providersclients/api";

export const useGetCurrentUser = () => {
 const query = useQuery({
  queryKey: ["getCurrentUser"],
  queryFn: async () => {
    const data = await graphqlClient.request<GetCurrentUserQuery,GetAllChatsQueryVariables>(getCurrentUserQuery as any);
    return data;
  }
 });
 return {...query,user:query.data?.getCurrentUser,isLoading:query.isLoading}
}
export const useGetAllChats = (room: string) => {
 const query=useQuery({
  queryKey:["getAllChats",room],
  queryFn:async()=>{
   const data=await graphqlClient.request<GetAllChatsQuery,GetAllChatsQueryVariables>(getAllChatsQuery as any,{room:room})
    return data;
  }
 });
 return {...query,chat:query.data?.getAllChats,isLoading:query.isLoading}
}
export const useGetAllRooms=()=>{
 const query=useQuery({
  queryKey:["getAllRooms"],
  queryFn:async()=>{
   const data=await graphqlClient.request<GetAllRoomsQuery,GetAllRoomsQueryVariables>(getAllRoomsQuery as any)
   return data;
  }
 })
 return {...query,rooms:query.data?.getAllRooms,isLoading:query.isLoading}
}
export const useGetAllDrawingArea=(room:string)=>{
  const query=useQuery({
    queryKey:["getAllDrawingAreas",room],
    queryFn:async()=>{
    const data=await graphqlClient.request<GetAllDrawingAreasQuery,GetAllDrawingAreasQueryVariables>(getDrawingAreaQuery as any,{room:room})
    return data;
    }
  })
  return {...query,areas:query.data?.getAllDrawingAreas,isLoading:query.isLoading}
}

