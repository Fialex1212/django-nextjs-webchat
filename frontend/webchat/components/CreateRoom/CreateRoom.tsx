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
import { useEffect } from "react";
import { useAuth } from "@/contexts/authContext";

const formSchema = z.object({
  name: z.string().min(8).max(50),
  is_private: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

const CreateRoom = () => {
    const {token} = useAuth();
    const router = useRouter();
  
    const form = useForm<FormData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        is_private: false,
      },
    });
  
    const onSubmit = async (data: FormData) => {
      console.log(data);
      try {
        const response =  await axios.post("http://127.0.0.1:8000/api/rooms/", data);
        console.log(response.data);
        toast.success("Successfully signed in.");
        router.push(`/rooms/${name}`);
      } catch (error) {
        toast.error("Something went wrong, check your inputs.");
        console.log(error);
      }
    };
  
    useEffect(() => {
      if (token) {
        router.push("/");
      }
    }, [token, router]);


  return (
    <main className="flex h-[calc(100vh-100px)] justify-center items-center">
      <Toaster />
      <Card className="mx-auto max-w-sm xs:border border-0">
        <CardHeader>
          <CardTitle className="text-xl">Sign In</CardTitle>
          <CardDescription>
            Enter your information to sign in to an account
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
                            type="checkboox"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Create a room
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default CreateRoom;
