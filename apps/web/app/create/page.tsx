"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Tag, Lock, Link, Plus, X } from "lucide-react";
import { Button } from "@utils/components/ui/button";
import { Input } from "@utils/components/ui/input";
import { Label } from "@utils/components/ui/label";
import { Card } from "@utils/components/ui/card";
import { PasswordInput } from "@utils/components/vui/passwordinput";
import { graphqlClient } from "useCases/Providersclients/api";
import { CreateRoomMutation, CreateRoomMutationVariables } from "gql/graphql";
import { createRoomMutation } from "graphql/mutation/user";
import { redirect } from "next/navigation";

interface FormData {
  slug: string;
  password: string;
  tags: string[];
  currentTag: string;
}

export default function App() {
  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      slug: "",
      password: "",
      tags: [],
    },
  });
  const [password, setPassword] = useState<string>("");
  const currentTag = watch("tags");

  const onSubmit = async(data: FormData) => {
    console.log("Form submitted:", data);
    const payload={
      slug:data.slug,
      tags:data.tags,
      password:password
    }
    const ans=await graphqlClient.request<CreateRoomMutation,CreateRoomMutationVariables>(createRoomMutation as any,payload);
    console.log(payload);
    redirect("/canvas")
  };

  const addTag = () => {
    const newTag = watch("currentTag");
    if (newTag?.trim() && !watch("tags").includes(newTag.trim())) {
      setValue("tags", [...watch("tags"), newTag.trim()]);
      setValue("currentTag", "");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      "tags",
      watch("tags").filter((tag) => tag !== tagToRemove)
    );
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <Card className="w-[400px] bg-black/50 backdrop-blur-xl border border-white/10 shadow-xl rounded-lg p-6">
        <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-teal-400 via-cyan-300 to-cyan-500 bg-clip-text text-center mb-6">
          Create Room
        </h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label className="text-gray-300 flex items-center gap-2 pb-3">
              <Link className="w-4 h-4" /> Slug
            </Label>
            <Input
              type="text"
              {...register("slug", { required: true })}
              className="bg-white/5 border border-white/10 text-white"
              placeholder="enter-your-slug"
            />
          </div>

          <div>
            <Label className="text-gray-300 flex items-center gap-2 pb-3">
              <Lock className="w-4 h-4" /> Password
            </Label>
            <PasswordInput password={password} setPassword={setPassword}  />
          </div>

          <div>
            <Label className="text-gray-300 flex items-center gap-2 pb-3">
              <Tag className="w-4 h-4" /> Tags
            </Label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {watch("tags").map((tag, index) => (
                <span
                  key={index}
                  className="bg-teal-500/20 text-teal-400 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-teal-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                {...register("currentTag")}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                className="bg-white/5 border border-white/10 text-white"
                placeholder="Add a tag"
              />
              <Button
                type="button"
                onClick={addTag}
                className="bg-gradient-to-r from-teal-400 via-cyan-400 to-cyan-500 text-black font-semibold hover:opacity-90"
              >
                <Plus className="w-4 h-4" /> Add
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-400 via-cyan-400 to-cyan-500 text-black font-semibold hover:opacity-90"
          >
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
}