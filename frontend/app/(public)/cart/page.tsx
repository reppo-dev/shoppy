import { getCart } from "@/app/action/cart";
import CartClient from "@/components/cart-client";

export default async function CartPage() {
  const result = await getCart();

  if (!result.success) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p>{"Unable to load cart"}</p>
      </div>
    );
  }

  return <CartClient initialCart={result.data!} />;
}
