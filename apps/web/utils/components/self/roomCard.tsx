import { Users } from "lucide-react";
import JoinButton from "./joinButton";

interface RoomCardProps {
  room: {
    id: number;
    name: string;
    participants: string;
    tags: string[];
  };
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black rounded-2xl shadow-lg shadow-cyan-500/20 overflow-hidden flex flex-col h-full border border-white/10">
      <div className="p-4 pb-2">
        <h3 className="text-lg font-semibold truncate text-white" title={room.name}>
          {room.name}
        </h3>
      </div>
      <div className="px-4 pb-2 flex-grow">
        <div className="flex items-center mb-2 text-sm text-gray-400">
          <Users className="h-4 w-4 mr-1 text-cyan-400" />
          <span>{room.participants}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {room.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-1 bg-cyan-900/50 text-cyan-300 rounded-full text-xs">
              {tag}
            </span>
          ))}
          {room.tags.length > 2 && (
            <span className="px-2 py-1 bg-cyan-900/50 text-cyan-300 rounded-full text-xs">
              +{room.tags.length - 2}
            </span>
          )}
        </div>
      </div>
      <div className="p-4 pt-2">
        <JoinButton slug={room.name} />
      </div>
    </div>
  );
}
