"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { registr } from "@/app/action/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const signupSchama = z
  .object({
    user_name: z.string().min(6, "user name must 6 character"),
    email: z.string().email(),
    password: z.string().min(8, "password mush be 8 character"),
    password_confirm: z.string(),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "Password do not match",
    path: ["password_confirm"],
  });

type SignUpSchamaForm = z.infer<typeof signupSchama>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>();
  const form = useForm<SignUpSchamaForm>({
    resolver: zodResolver(signupSchama),
    defaultValues: {
      user_name: "",
      email: "",
      password: "",
      password_confirm: "",
    },
  });

  async function onSubmit(data: SignUpSchamaForm) {
    setLoading(true);
    try {
      const result = await registr(data);
      if (!result?.success) {
        setServerError(result?.message);
      } else {
        toast("Sign up success");
        router.push("/");
      }
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Sign up for an account</CardTitle>
          <CardDescription>
            Enter your email below to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <FormField
                  name="user_name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-primary">
                        User Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="username"
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-primary">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="any@email.com"
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-primary">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="********"
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password_confirm"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-primary">
                        Password Confirm
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="********"
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Field>
                  {serverError && (
                    <div className="rounded-md bg-red-50 p-3 text-sm font-medium text-red-700">
                      {serverError}
                    </div>
                  )}
                  <Button type="submit" disabled={loading}>
                    {loading ? "registring" : "Sign up"}
                  </Button>
                  <FieldDescription className="text-center">
                    Do you have an account? <a href="/login">Login</a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
