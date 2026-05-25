"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup } from "./ui/field";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { createProduct } from "@/app/action/product";
import { getUserInfo } from "@/app/action/getUserId";
import { toast } from "sonner";

const productSchama = z.object({
  name: z.string().min(2, "Name must 2 character"),
  image: z.string(),
  description: z.string().min(10, "description must 10 character"),
  price: z.number().min(1, "price can't emty"),
  user_id: z.number(),
});

type FormProductSchama = z.infer<typeof productSchama>;

const FormCreateProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const form = useForm<FormProductSchama>({
    resolver: zodResolver(productSchama),
    defaultValues: {
      description: "",
      image: "",
      name: "",
      price: 0,
      user_id: 0,
    },
  });
  useEffect(() => {
    const fetchUserId = async () => {
      const user = await getUserInfo();
      setUserId(user.userId);
      form.setValue("user_id", user.userId);
    };
    fetchUserId();
  }, []);

  async function onSubmit(data: FormProductSchama) {
    try {
      setIsLoading(true);
      const respunse = await createProduct(data);
      if (respunse.success) {
        toast("create product success");
      } else {
        toast("somthing want wrong!");
      }
    } catch {
      toast("you can't make product");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-primary">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="name"
                    {...field}
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-primary">
                  Description
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="description"
                    {...field}
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-primary">
                  Image URL
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="image url"
                    {...field}
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-primary">
                  Price
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="price"
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number(e.target.value) || 0)
                    }
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading || userId === null}>
            {isLoading ? "Creating..." : "Create product"}
          </Button>
        </FieldGroup>
      </form>
    </Form>
  );
};

export default FormCreateProduct;
