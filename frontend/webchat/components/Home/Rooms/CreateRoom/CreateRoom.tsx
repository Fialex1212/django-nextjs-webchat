"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import ListTags from "./ListTags";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/useAtuhStore";

interface TagData {
  id: string;
  name: string;
}

const formSchema = z.object({
  name: z.string().min(3).max(50),
  is_private: z.boolean(),
  created_by: z.string(),
  password: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof formSchema>;

const CreateRoom = () => {
  const [selectedTags, setSelectedTags] = useState<TagData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      is_private: false,
      created_by: user?.id | null,
      password: "",
      tags: [],
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log(selectedTags);

    const formData = {
      ...data,
      tags: selectedTags.map((tag) => tag.name),
    };
    console.log(formData);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/rooms/",
        formData
      );
      console.log(response.data);
      toast.success("Successfully created room.");
      router.push(`/room/${data.name}`);
    } catch (error) {
      toast.error("Something went wrong, check your inputs.");
      console.log(error);
    }
  };

  const inOneClick = () => {
    const randomRoomName = `Room${Math.floor(Math.random() * 100000)}`;
    form.setValue("name", randomRoomName);
    form.setValue("is_private", true);
    form.setValue("password", "password");
  };

  useEffect(() => {
    if (isAuthenticated) {
    } else {
      toast(
        "You need be authorizated for create your own room",
        {
          duration: 6000,
        }
      );
      router.push("/auth/sign-in");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex justify-center items-center">
      <div className="grid gap-4 w-full">
        <Form {...form}>
          <form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name of room" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="is_private"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl className="flex items-center">
                      <Checkbox
                        className="w-6 h-6 flex justify-center items-center"
                        checked={isPrivate}
                        onCheckedChange={(checked: boolean) => {
                          setIsPrivate(checked);
                          field.onChange(checked);
                        }}
                      />
                    </FormControl>
                    <FormLabel>Is Private</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            {isPrivate && (
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter password for private room"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <ListTags
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
            <Button className="text-white" type="submit">
              Create a Room
            </Button>
            <p className="text-center">Or</p>
            <Button className="text-white" onClick={inOneClick} type="submit">
              Create a room in one click
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateRoom;
