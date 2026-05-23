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
import z from "zod";
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
import { login } from "@/app/action/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const loginSchama = z.object({
  email: z.string().email(),
  password: z.string().min(8, "password mush be 8 character"),
});

type LoginSchamaForm = z.infer<typeof loginSchama>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>();
  const form = useForm<LoginSchamaForm>({
    resolver: zodResolver(loginSchama),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginSchamaForm) {
    setLoading(true);
    try {
      const result = await login(data);
      if (!result?.success) {
        setServerError(result?.message);
      } else {
        toast("Login success");
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
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
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
                <Field>
                  {serverError && (
                    <div className="rounded-md bg-red-50 p-3 text-sm font-medium text-red-700">
                      {serverError}
                    </div>
                  )}
                  <Button type="submit" disabled={loading}>
                    {loading ? "Logining" : "Login"}
                  </Button>
                  <FieldDescription className="text-center">
                    Don&apos;t have an account? <a href="/signup">Sign up</a>
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
