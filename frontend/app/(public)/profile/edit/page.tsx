"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { User } from "@/interface";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getInfoUser, updateUser } from "@/app/action/user";

const formSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  image: z.string(),
  user_name: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [serverError, setServerError] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      image: "",
      user_name: "",
    },
  });

  const { setValue } = form;

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getInfoUser();
      if (result.success) {
        const user: User = result.data;

        setValue("first_name", user.first_name);
        console.log(user.first_name);
        setValue("last_name", user.last_name);
        setValue("email", user.email);
        setValue("image", user.email);
        setValue("user_name", user.user_name);
      } else {
        setServerError(result.message || "Failed to fetch user data");
      }
      setFetchLoading(false);
    };
    fetchUser();
  }, [setValue]);

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setServerError("");

    const result = await updateUser(values);
    if (result.success) {
      router.push("/profile");
    } else {
      setServerError(result.message || "Something went wrong");
    }
    setLoading(false);
  }

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="max-w-md mx-auto ">
      <CardHeader className="text-2xl font-bold mb-6 text-center">
        Edit Profile
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="user_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-primary">
                    User Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="h-11" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* First Name */}
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-primary">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} className="h-11" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-primary">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} className="h-11" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-primary">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      {...field}
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image URL (اختیاری) */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-primary">
                    Profile Image URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/avatar.jpg"
                      {...field}
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* خطای سرور */}
            {serverError && (
              <div className="rounded-md bg-red-50 p-3 text-sm font-medium text-red-700">
                {serverError}
              </div>
            )}

            {/* دکمه‌ها */}
            <div className="flex flex-col space-y-3 pt-2">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
