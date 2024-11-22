"use client";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { useUserData } from "@/contexts/userContext";

const formSchema = z.object({
  name: z.string().min(8).max(50),
  is_private: z.boolean(),
  created_by: z.string(),
  password: z.string().optional(), // Make password optional initially
});

type FormData = z.infer<typeof formSchema>;

const CreateRoom = () => {
  const { id } = useUserData();
  const { token } = useAuth();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      is_private: false,
      created_by: id,
      password: "",
    },
  });

  const [isPrivate, setIsPrivate] = useState(false); // Local state to handle privacy toggle

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/rooms/",
        data
      );
      console.log(response.data);
      toast.success("Successfully created room.");
      router.push(`/room/${data.name}`);
    } catch (error) {
      toast.error("Something went wrong, check your inputs.");
      console.log(error);
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      if (!token) {
        router.push("/auth/sign-in");
      }
    };
    checkToken();
  }, [router, token]);

  return (
    <main className="flex h-[calc(100vh-100px)] justify-center items-center">
      <Toaster />
      <Card className="mx-auto max-w-sm xs:border border-0">
        <CardHeader>
          <CardTitle className="text-xl">Create Room</CardTitle>
          <CardDescription>
            Enter your room information to create a new room
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Form {...form}>
              <form
                className="grid gap-3"
                onSubmit={form.handleSubmit(onSubmit)}
              >
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
                      <FormItem>
                        <FormLabel>Is Private</FormLabel>
                        <FormControl>
                          <Input
                            type="checkbox"
                            checked={isPrivate}
                            onChange={(e) => {
                              setIsPrivate(e.target.checked);
                              field.onChange(e.target.checked); // Update form state
                            }}
                          />
                        </FormControl>
                        <FormMessage />
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

                <Button type="submit" className="w-full">
                  Create a Room
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default CreateRoom;
