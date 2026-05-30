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
import { ChangeEventHandler, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { createProduct } from "@/app/action/product";
import { getUserInfo } from "@/app/action/getUserId";
import { toast } from "sonner";
import { s3UploadAction } from "@/app/action/s3BucketAction";
import Image from "next/image";
import { getCategories } from "@/app/action/category";

const productSchama = z.object({
  name: z.string().min(2, "Name must 2 character"),
  image: z.string(),
  description: z.string().min(10, "description must 10 character"),
  price: z.number().min(1, "price can't emty"),
  user_id: z.number(),
  category_ids: z.array(z.number()).min(1, "Select at least one category"),
});

type FormProductSchama = z.infer<typeof productSchama>;

const FormCreateProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [isImageAvalible, setIsImageAvalible] = useState(false);
  const [isImagePath, setIsImagePath] = useState(``);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [categories, setCategories] = useState<{ ID: number; name: string }[]>(
    [],
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(Array.isArray(data) ? data : []);
    };
    fetchCategories();
  }, []);
  const form = useForm<FormProductSchama>({
    resolver: zodResolver(productSchama),
    defaultValues: {
      description: "",
      image: "",
      name: "",
      price: 0,
      user_id: 0,
      category_ids: [],
    },
  });

  const handleCategoryToggle = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };
  useEffect(() => {
    form.setValue("category_ids", selectedCategories);
  }, [selectedCategories, form]);

  const uploadImage: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.set("file", file);
    const result = await s3UploadAction(data);
    const fullUrl = result.imagePath as string;

    if (result.success) {
      setIsImagePath(result.imagePath!);
      setIsImageAvalible(true);
      form.setValue("image", fullUrl);
    }
  };

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
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-primary">
                  Image URL
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled={isImageAvalible}
                    placeholder="image url"
                    {...field}
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Upload new image
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={uploadImage}
              disabled={isLoading}
            />

            {isImagePath && (
              <div className="mt-2">
                <p className="text-sm text-green-600">
                  Image uploaded successfully!
                </p>
                <Image
                  src={`${isImagePath}`}
                  alt="New"
                  width={32}
                  height={32}
                  className="w-32 h-32 object-cover mt-1 rounded border"
                />
              </div>
            )}
          </div>
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
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Categories</label>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <label key={cat.ID} className="flex items-center gap-1">
                  <Input
                    type="checkbox"
                    value={cat.ID}
                    checked={selectedCategories.includes(cat.ID)}
                    onChange={() => handleCategoryToggle(cat.ID)}
                  />
                  {cat.name}
                </label>
              ))}
            </div>
            {selectedCategories.length === 0 && (
              <p className="text-sm text-red-500 mt-1">
                Select at least one category
              </p>
            )}
          </div>
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
          <Button type="submit">
            {isLoading ? "Creating..." : "Create product"}
          </Button>
        </FieldGroup>
      </form>
    </Form>
  );
};

export default FormCreateProduct;
