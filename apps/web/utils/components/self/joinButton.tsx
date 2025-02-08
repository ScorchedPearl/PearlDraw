"use client";

import { useState } from "react";
import { Card } from "@utils/components/ui/card";
import { Button } from "@utils/components/ui/button";
import { Input } from "@utils/components/ui/input";
import { Label } from "@utils/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { LockIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { CheckRoomQueryQuery, CheckRoomQueryQueryVariables } from "gql/graphql";
import { checkRoomPasswordQuery } from "graphql/query/user";
import { graphqlClient } from "useCases/Providersclients/api";

export default function JoinButton(roomji:{
 slug:string
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [showIncorrect,setShowIncorrect]=useState(false);
  const router=useRouter();

  return (
    <div>
      <Button
        className="w-full bg-gradient-to-r from-teal-400 via-cyan-400 to-cyan-500 text-black font-semibold py-2 rounded-lg text-sm hover:opacity-90 transition-all"
        onClick={() => setIsOpen(true)}
      >
        Join
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="w-96 bg-black/50 border border-white/10 backdrop-blur-xl shadow-xl rounded-lg p-6">
                <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-teal-400 via-cyan-300 to-cyan-500 bg-clip-text text-center">
                  Enter Room Password
                </h2>

                <div className="mt-4">
                  <Label className="text-sm text-gray-300">Password</Label>
                  <div className="relative mt-2">
                    <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      type="password"
                      className="pl-10 bg-white/5 border border-white/10 text-white py-2 rounded-lg w-full"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                {showIncorrect&&
                <div className="text-sm pt-5 font-bold text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text">Incorrect Password</div>
                }
                <div className="mt-6 flex justify-end gap-2">
                  <Button variant="outline" className="border border-white/10 text-black hover:bg-white hover:text-gray-400" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  
                  <Button
                    className="bg-gradient-to-r from-teal-400 via-cyan-400 to-cyan-500 text-black font-semibold hover:opacity-90 transition-opacity rounded-lg"
                    onClick={async() => {
                     const room=roomji.slug;
                      const isCorrect=await graphqlClient.request<CheckRoomQueryQuery,CheckRoomQueryQueryVariables>(checkRoomPasswordQuery as any,{password,room})
                      console.log(isCorrect);
                      if(isCorrect.checkRoomPassword){
                        router.push(`/canvas/${room}?password=${password}`)
                        setIsOpen(false);
                      }else{
                        setShowIncorrect(true);
                      }
                    }}
                  >
                    Submit
                  </Button>
                </div>
                
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
