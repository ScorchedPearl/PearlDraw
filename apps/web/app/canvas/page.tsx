"use client"

import { useState } from "react";
import { Search, PlusCircle } from "lucide-react";
import RoomCard from "@utils/components/self/roomCard";
import { useGetAllRooms } from "hooks/user";


export default function RoomJoinPage() {
  interface Room {
    id: number;
    name: string;
    participants: string;
    tags: string[];
  }

  interface RoomData {
    slug: string;
    admin: { name: string };
    tags: string[];
  }

  interface Data {
    rooms?: RoomData[];
  }

  const data: Data = useGetAllRooms();

  const roomsData: Room[] = data.rooms?.map((room, index) => ({
    id: index + 1,
    name: room?.slug as string,
    participants: room?.admin?.name as string,
    tags: room?.tags as string[],
  })) || [];
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRooms = roomsData.filter(
    (room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="h-screen w-screen py-8 bg-gradient-to-b from-black via-gray-900 to-black text-center">
      <header className="pt-20 pb-16 bg-gradient-to-b from-black via-gray-900 to-black text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
          Join a Room
        </h1>
        <div className="flex justify-center mt-6 gap-2">
          <input
            type="text"
            placeholder="Search rooms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 max-w-lg text-white"
          />
          <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400">
            <Search className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="flex justify-center mt-8">
          <a className="flex items-center justify-around gap-2 bg-gradient-to-r from-teal-400 via-cyan-400 to-cyan-500 text-black font-semibold py-2 px-4 rounded-lg text-sm transition-all hover:opacity-90 hover:shadow-lg hover:shadow-cyan-500/50 w-40" href="/create">
            <PlusCircle className="h-5 w-5" />
            Create Room
          </a>
        </div>
      </header>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-8">
        {filteredRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
      {filteredRooms.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No rooms found matching your search.</p>
      )}
    </div>
  );
}
