"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Cart } from "@/interface";
import { removeCartItem } from "@/app/action/cart";

interface CartClientProps {
  initialCart: Cart;
}

export default function CartClient({ initialCart }: CartClientProps) {
  const [cart, setCart] = useState<Cart>(initialCart);
  const [loading, setLoading] = useState(false);

  const removeItem = async (itemId: number) => {
    setLoading(true);
    const result = await removeCartItem(itemId);
    if (result.success) {
      const updatedItems = cart.items.filter((item) => item.id !== itemId);
      const newTotal = updatedItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0,
      );
      setCart({ ...cart, items: updatedItems, total: newTotal });
      toast.success("Item removed");
    } else {
      toast.error("Removal failed");
    }
    setLoading(false);
  };

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item, index) => (
            <Card key={item?.id ?? index}>
              <CardContent className="flex flex-col sm:flex-row gap-4 p-4">
                <div className="w-24 h-24 relative bg-gray-100 rounded-md overflow-hidden">
                  <Image
                    src={item.product.image || "/placeholder.jpg"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <Link href={`/products/${item.product_id}`}>
                    <h2 className="text-lg font-semibold hover:underline">
                      {item.product.name}
                    </h2>
                  </Link>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {item.product.description}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-8 text-center">{item.quantity}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold">
                        {(item.price * item.quantity).toLocaleString()} T
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        disabled={loading}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{cart.total?.toLocaleString() || 0} T</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-4">
                <span>Total</span>
                <span>{cart.total?.toLocaleString() || 0} T</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
